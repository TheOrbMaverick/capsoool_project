from flask import Flask, request, jsonify
from routes import app_routes
from models.user import User
from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from flask_cors import CORS
from sqlalchemy.exc import NoResultFound
from models import create_table, session



app = Flask(__name__, subdomain_matching=True)
app.register_blueprint(app_routes)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:8081"}})

verify_password = User.verify_password

@app.route("/")
def index():
    return "This is your front page"


@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        user = User.query.filter_by(email=email).one()
    except NoResultFound:
        return jsonify({'error': 'Invalid email or password'}), 401

    if user.verify_password(password):
        return jsonify({'message': 'Sign-in successful'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


if __name__ == "__main__":
    create_table()
    app.config["SERVER_NAME"] = "localhost:5000"
    app.run(debug=True)
