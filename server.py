import flask
from ia import llama_ia
app = flask.Flask(__name__)

@app.route("/api/ia", methods=["POST"])
def index():
    data = flask.request.get_json()
    res = llama_ia(data["quest"], data["file_path"])
    return res


@app.route("/api/ai", methods=["GET"])
def index2():
    return "Hola amigo, mete un pdf por post y lo respondo" 


app.run()

