from flask import Flask
from routes import app_routes
from models.user import User
from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from flask_cors import CORS


app = Flask(__name__, subdomain_matching=True)
app.register_blueprint(app_routes)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:8081"}})

@app.route("/")
def index():
    return "This is your front page"


if __name__ == "__main__":
    app.config["SERVER_NAME"] = "localhost:5000"
    app.run(debug=True)
