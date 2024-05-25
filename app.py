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
    

@app.route('/home/<int:user_id>', methods=['POST'])
def get_user_texts(user_id):
    texts = session.query(Text).filter_by(author_id=user_id).all()
    text_list = [
        {
            'id': text.id,
            'title': text.title,
            'content': text.content,
            'recipients': text.recipients,
            'created_at': text.created_at,
            'updated_at': text.updated_at,
            'author_id': text.author_id
        }
        for text in texts
    ]
    return jsonify(text_list)


@app.route('/home/<int:user_id>/createtext', methods=['POST'])
def create(user_id):
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    title = data.get('title')
    recipients = data.get('recipients')
    content = data.get('content')
    author_id = user_id

    if not title or not recipients or not content:
        return jsonify({"message": "Missing fields"}), 400

    new_text = Text(
        title=title,
        recipients=recipients,
        content=content,
        author_id=author_id
    )

    try:
        session.add(new_text)
        session.commit()
        return jsonify({"message": "Text created successfully"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    

@app.route('/home/<int:user_id>/text/<int:text_id>', methods=['PUT'])
def edit_text(user_id, text_id):
    data = request.get_json()
    text_item = session.query(Text).filter_by(author_id=user_id, id=text_id).first()
    if text_item is None:
        return jsonify({'message': 'Text item not found'}), 404

    text_item.title = data.get('title', text_item.title)
    text_item.recipients = data.get('recipients', text_item.recipients)
    text_item.content = data.get('content', text_item.content)
    text_item.updated_at = datetime.now()
    
    session.add(text_item)
    session.commit()
    
    return jsonify({'message': 'Text item updated successfully'}), 200


if __name__ == "__main__":
    create_table()
    app.config["SERVER_NAME"] = "localhost:5000"
    app.run(debug=True)
