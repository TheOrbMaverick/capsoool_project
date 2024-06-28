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
    """
    Index route for the application.
    
    Returns:
        str: Front page message
    """
    return "This is your front page"

@app.route('/signup', methods=['POST'])
def signup():
    """
    Signup route to create a new user.
    
    Request Body:
        firstName (str): User's first name
        lastName (str): User's last name
        email (str): User's email
        password (str): User's password
        phoneNumber (str): User's phone number
    
    Returns:
        response (json): Success message or error message
    """
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    phoneNumber = data.get('phoneNumber')

    if not firstName or not lastName or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    new_user = User(
        firstName=firstName,
        lastName=lastName,
        email=email,
        password=password,
        phoneNumber=phoneNumber
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
    """
    Login route to authenticate a user.
    
    Request Body:
        email (str): User's email
        password (str): User's password
    
    Returns:
        response (json): User data or error message
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = session.query(User).filter_by(email=email).first()
    if user and user.verify_password(password):
        user.lastLogin = datetime.now()
        session.commit()
        user_data = {
            'id': user.id,
            'email': user.email,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'phoneNumber': user.phoneNumber,
            'lastLogin': user.lastLogin,
            'confirmed_email': user.confirmed_email,
            'createdAt': user.createdAt,
            'updatedAt': user.updatedAt,
            'tier': user.tier,
        }
        return jsonify({'user': user_data}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/home/<int:user_id>', methods=['POST'])
def get_user_texts(user_id):
    """
    Retrieve all texts for a specific user.
    
    Args:
        user_id (int): The ID of the user whose texts are to be retrieved
    
    Returns:
        response (json): List of texts or error message
    """
    texts = session.query(Text).filter_by(authorId=user_id).all()
    text_list = [
        {
            'id': text.id,
            'title': text.title,
            'content': text.content,
            'recipients': text.recipients,
            'createdAt': text.createdAt,
            'updatedAt': text.updatedAt,
            'authorId': text.authorId
        }
        for text in texts
    ]
    return jsonify(text_list)

@app.route('/home/<int:user_id>/trusted', methods=['GET'])
def get_trusted(user_id):
    """
    Retrieve all trusted people for a specific user.
    
    Args:
        user_id (int): The ID of the user whose trusted people are to be retrieved
    
    Returns:
        response (json): List of trusted people or error message
    """
    trusted = session.query(Trusted).filter_by(authorId=user_id).all()
    trust_list = [
        {
            'id': trust.id,
            'firstName': trust.firstName,
            'lastName': trust.lastName,
            'email': trust.email,
            'createdAt': trust.createdAt,
            'updatedAt': trust.updatedAt,
            'authorId': trust.authorId
        }
        for trust in trusted
    ]
    return jsonify(trust_list)

@app.route('/home/<int:user_id>/createtext', methods=['POST'])
def create_text(user_id):
    """
    Create a new text for a specific user.
    
    Args:
        user_id (int): The ID of the user creating the text
    
    Request Body:
        title (str): Title of the text
        recipients (str): Recipients of the text
        content (str): Content of the text
    
    Returns:
        response (json): Success message or error message
    """
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    title = data.get('title')
    recipients = data.get('recipients')
    content = data.get('content')
    authorId = user_id

    if not title or not recipients or not content:
        return jsonify({"message": "Missing fields"}), 400

    new_text = Text(
        title=title,
        recipients=recipients,
        content=content,
        authorId=authorId
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
    """
    Edit an existing text for a specific user.
    
    Args:
        user_id (int): The ID of the user who owns the text
        text_id (int): The ID of the text to be edited
    
    Request Body:
        title (str): Title of the text
        recipients (str): Recipients of the text
        content (str): Content of the text
    
    Returns:
        response (json): Success message or error message
    """
    data = request.get_json()
    text_item = session.query(Text).filter_by(authorId=user_id, id=text_id).first()
    if text_item is None:
        return jsonify({'message': 'Text item not found'}), 404

    text_item.title = data.get('title', text_item.title)
    text_item.recipients = data.get('recipients', text_item.recipients)
    text_item.content = data.get('content', text_item.content)
    text_item.updatedAt = datetime.now()
    
    session.add(text_item)
    session.commit()
    
    return jsonify({'message': 'Text item updated successfully'}), 200

@app.route('/home/<int:user_id>/text/<int:text_id>', methods=['DELETE'])
def delete_text(user_id, text_id):
    """
    Delete a text for a specific user.
    
    Args:
        user_id (int): The ID of the user who owns the text
        text_id (int): The ID of the text to be deleted
    
    Returns:
        response (json): Success message or error message
    """
    text_item = session.query(Text).filter_by(authorId=user_id, id=text_id).first()
    if text_item is None:
        return jsonify({'message': 'Text item not found'}), 404

    session.delete(text_item)
    session.commit()

    return jsonify({'message': 'Text item deleted successfully'}), 200

@app.route('/home/<int:user_id>/alldata', methods=['GET'])
def all_user_data(user_id):
    """
    Retrieve all data (texts, videos, images, trusted people) for a specific user.
    
    Args:
        user_id (int): The ID of the user whose data is to be retrieved
    
    Returns:
        response (json): Lists of texts, videos, images, and trusted people
    """
    texts = session.query(Text).filter_by(authorId=user_id).all()
    videos = session.query(Video).filter_by(authorId=user_id).all()
    images = session.query(Image).filter_by(authorId=user_id).all()
    trusted = session.query(Trusted).filter_by(authorId=user_id).all()
    recipients = session.query(Recipient).filter_by(authorId=user_id).all()

    text_list = [
        {
            'id': text.id,
            'title': text.title,
            'content': text.content,
            'recipients': text.recipients,
            'createdAt': text.createdAt,
            'updatedAt': text.updatedAt,
            'authorId': text.authorId
        }
        for text in texts
    ]

    video_list = [
        {
            'id': video.id,
            'title': video.title,
            'video': video.video,
            'recipients': video.recipients,
            'size': video.size,
            'thumbnail': video.thumbnail,
            'createdAt': video.createdAt,
            'authorId': video.authorId
        }
        for video in videos
    ]

    image_list = [
        {
            'id': image.id,
            'filename': image.filename,
            'filepath': image.filepath,
            'recipients': image.recipients,
            'createdAt': image.createdAt,
            'authorId': image.authorId
        }
        for image in images
    ]

    trust_list = [
        {
            'id': trust.id,
            'firstName': trust.firstName,
            'lastName': trust.lastName,
            'email': trust.email,
            'phoneNumber':trust.phoneNumber,
            'tp_image': trust.tp_image,
            'createdAt': trust.createdAt,
            'updatedAt': trust.updatedAt,
            'authorId': trust.authorId
        }
        for trust in trusted
    ]

    recipient_list = [
        {
            'id': recipient.id,
            'firstName': recipient.firstName,
            'lastName': recipient.lastName,
            'email': recipient.email,
            'phoneNumber':recipient.phoneNumber,
            'createdAt': recipient.createdAt,
            'updatedAt': recipient.updatedAt,
            'authorId': recipient.authorId
        }
        for recipient in recipients
    ]

    return jsonify(text_list, trust_list, video_list, image_list, recipient_list)

@app.route('/newContact', methods=['POST'])
def newContact():
    """
    Contact route to create a new contact.
    
    Request Body:
        firstName (str): User's first name
        lastName (str): User's last name
        email (str): User's email
        phoneNumber (str): User's phone number
    
    Returns:
        response (json): Success message or error message
    """
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    phoneNumber = data.get('phoneNumber')

    if not firstName or not lastName or not email:
        return jsonify({"message": "Missing fields"}), 400

    new_contact = Recipient(
        firstName=firstName,
        lastName=lastName,
        email=email,
        phoneNumber=phoneNumber
    )

    try:
        session.add(new_contact)
        session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

if __name__ == "__main__":
    create_table()
    # app.config["SERVER_NAME"] = "localhost:5000"
    app.run(debug=True)
