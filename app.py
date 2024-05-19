from flask import Flask, request, jsonify
from routes import app_routes
from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from models.user import User
from flask_cors import CORS
from sqlalchemy.exc import NoResultFound
from datetime import datetime
from models import create_table, session



app = Flask(__name__, subdomain_matching=True)
app.register_blueprint(app_routes)
CORS(app)

@app.route("/")
def index():
    return "This is your front page"


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = session.query(User).filter_by(email=email).first()
    if user and user.verify_password(password):
        user.last_login = datetime.now()
        session.commit()
        user_data = {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'last_login': user.last_login,
            'confirmed_email': user.confirmed_email,
            'created_at': user.created_at,
            'updated_at': user.updated_at,
            'tier': user.tier,
        }
        return jsonify({'user': user_data}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phoneNumber')

    if not first_name or not last_name or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        phone_number=phone_number
    )

    try:
        session.add(new_user)
        session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


if __name__ == "__main__":
    create_table()
    app.config["SERVER_NAME"] = "localhost:5000"
    app.run(debug=True)
