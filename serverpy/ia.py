from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

def llama_ia(quest, file_path):
    print(file_path)  # nombre del archivo recibido # ruta completa del archivo

    # Inicializar el modelo de lenguaje
    llm = ChatOllama(model="llama3.2:1b")

    # Cargar el contenido del PDF
    loader = PyMuPDFLoader(file_path)
    data_pdf = loader.load()  # Cargar datos del PDF

    # Dividir el contenido en chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
    chunks = text_splitter.split_documents(data_pdf)

    # Crear los embeddings de los chunks
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Configurar la base de datos de embeddings
    persist_db = "chroma_db_dir"
    collection_db = "chroma_collection"

    vs = Chroma.from_documents(
        documents=chunks,
        embedding=embed_model,
        persist_directory=persist_db,
        collection_name=collection_db
    )

    # Configurar el vectorstore
    retriever = vs.as_retriever(search_kwargs={'k': 5})

    # Configurar el template para la pregunta
    custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
    Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

    Contexto: {context}
    Pregunta: {question}

    Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español.
    Respuesta útil:
    """

    prompt = PromptTemplate(
        template=custom_prompt_template,
        input_variables=['context', 'question']
    )

    # Configurar el chain de QA
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={'prompt': prompt}
    )

    # Realizar la pregunta usando el parámetro `quest`
    resp = qa.invoke({"query": quest})

    # Extraer solo la respuesta útil (de la clave "result")
    answer = resp.get("result", "No se pudo obtener una respuesta.")
    
    # Devolver solo la respuesta útil
    return answer
