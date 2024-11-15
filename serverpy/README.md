# RAG con LangChain y Ollama
El sistema RAG es particularmente útil para recuperar información de documentos específicos (por ejemplo, manuales, guías de usuario o informes técnicos). Esto optimiza la precision en la respuesta, evitando la busqueda manual y proporcionando un acceso directo y efectivo a la información relevante para los usuarios.

## Descripción del Proyecto
Se selecciona un documento en formato PDF que contiene información sobre un tema de interés. Este documento se utilizará para entrenar el modelo, permitiendo a los usuarios realizar preguntas específicas sobre su contenido.

## Alcance:
Recibe consultas de usuarios sobre el documento seleccionado.
Responde preguntas a través de un modelo de lenguaje entrenado para extraer información relevante del texto base.
Ofrece una interfaz intuitiva para formular consultas y presentar las respuestas de manera clara.

## Requisitos:
- Python 3.8 o superior
- LangChain
- Ollama

## Guía de Instalación:
1. Instalar Python 3.8 o superior.
2. Configurar un entorno virtual:
    ```bash
    python -m venv env
    ```
3. Activar el entorno virtual:
    - En Windows:
        ```bash
        .\env\Scripts\activate
        ```
    - En macOS y Linux:
        ```bash
        source env/bin/activate
        ```
4. Instalar dependencias:
    ```bash
    pip install -r requisitos.txt
    ```
5. Iniciar Ollama:
    ```bash
    ollama serve
    ```
6. Iniciar el servidor de Python:
    ```bash
    python server.py
    ```



