from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA


def llama_ia(quest, file_path):

    # Definimos el modelo de llm que vamos a utilizar
    llm = ChatOllama(model="llama3.2:1b")

    # Definimos el loader del pdf
    loader = PyMuPDFLoader(file_path)

    # Cargamos el contenido del pdf
    data_pdf = loader.load()

    # Definimos el tamaño de los chunks y el overlap (superposición de los chunks)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)

    # Dividimos el contenido del pdf en chunks
    chunks = text_splitter.split_documents(data_pdf)

    # Definimos el modelo de embeddings que vamos a utilizar
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Definimos el directorio donde se va a guardar la base de datos
    persist_db = "chroma_db_dir"
    # Definimos el nombre de la colección
    collection_db = "chroma_collection"

    # Creamos la base de datos con los chunks
    vs = Chroma.from_documents(
        documents=chunks,
        embedding=embed_model,
        persist_directory=persist_db,
        collection_name=collection_db
    )

    # Creamos el retriever
    vectorstore = Chroma(
        embedding_function=embed_model,
        persist_directory=persist_db,
        collection_name=collection_db
    )

    retriever = vectorstore.as_retriever(
        search_kwargs={'k': 5} # Cantidad de chunks a retornar
    )

    # Definimos el template de la pregunta
    custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
    Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

    Contexto: {context}
    Pregunta: {question}

    Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español
    Respuesta útil:
    """

    # Definimos el prompt template para la pregunta
    prompt = PromptTemplate(
        template=custom_prompt_template,
        input_variables=['context', 'question']
    )

    # Creamos el chain de QA para realizar la búsqueda
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={'prompt': prompt}
    )

    # Realizamos la pregunta al modelo
    quest = input("Ingrese su pregunta: ")
    resp = qa.invoke({"query": quest})

    # Mostramos la respuesta
    return resp

