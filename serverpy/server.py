import flask
from ia import llama_ia
import os

app = flask.Flask(__name__)

@app.route("/api/ia", methods=["POST"])
def index():
    # Verifica que el archivo está en la solicitud
    if 'file' not in flask.request.files:
        return "Missing file", 400

    file = flask.request.files['file']  # Obtiene el archivo
    quest = flask.request.form.get("quest")  # Obtiene otros datos del formulario
    
    # Verifica que los parámetros necesarios están presentes
    if not file or file.filename == '':
        return "Missing or empty file", 400
    
    if quest is None:
        return "Missing required parameter 'quest'", 400

    # Guarda el archivo en una carpeta temporal o designada
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)  # Guarda el archivo en el servidor
    
    # Procesa el archivo y la pregunta usando llama_ia
    res = llama_ia(quest, file_path)
    return res

if __name__ == "__main__":
    app.run(debug=True)

