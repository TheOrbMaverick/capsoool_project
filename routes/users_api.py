from routes import app_routes
from models import session
from models.user import User
from flask import jsonify, request

@app_routes.route('/users', strict_slashes=True)
def users():
    """ 
    Retrieving all the users 
    
    Returns:
        response (json): JSON object containing a list of all users
    """
    try:
        users = session.query(User).all()
        user_data = [{'id': user.id, 'email': user.email,
                      'firstName': user.firstName,
                      'lastName': user.lastName,
                      'phoneNumber': user.phoneNumber,
                      'lastLogin': user.lastLogin,
                      'confirmed_email': user.confirmed_email,
                      'createdAt': user.createdAt,
                      'updatedAt': user.updatedAt
                     } for user in users]
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Failed to retrieve users"), 500

    return jsonify(users=user_data)

@app_routes.route('/users/<int:user_id>', strict_slashes=True)
def get_user(user_id):
    """ 
    Retrieving a single user by ID
    
    Args:
        user_id (int): The ID of the user to retrieve
        
    Returns:
        response (json): JSON object containing user details or an error message
    """
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if user:
            single_user = {
                'id': user.id,
                'email': user.email,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'phoneNumber': user.phoneNumber,
                'lastLogin': user.lastLogin,
                'confirmed_email': user.confirmed_email,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            }
            return jsonify(user=single_user), 200
        else:
            return jsonify(message="User not found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Failed to retrieve user"), 500

@app_routes.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
    """ 
    Creating a new user
    
    Request Body:
        id (int): User ID
        email (str): User email
        firstName (str): User first name
        lastName (str): User last name
        phoneNumber (str): User phone number
    
    Returns:
        response (json): Success message or error message
    """
    try:
        data = request.json
        new_user = User(
            id=data.get('id'),
            email=data.get('email'),
            firstName=data.get('firstName'),
            lastName=data.get('lastName'),
            phoneNumber=data.get('phoneNumber')
        )
        session.add(new_user)
        session.commit()

        return jsonify(message="User created successfully"), 201
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Failed to create user"), 500

@app_routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """ 
    Updating an existing user
    
    Args:
        user_id (int): The ID of the user to update
    
    Request Body:
        email (str): User email
        firstName (str): User first name
        lastName (str): User last name
        phoneNumber (str): User phone number
    
    Returns:
        response (json): Success message or error message
    """
    try:
        data = request.json
        user = session.query(User).filter_by(id=user_id).first()
        if user:
            # Update the user data
            user.email = data.get('email', user.email)
            user.firstName = data.get('firstName', user.firstName)
            user.lastName = data.get('lastName', user.lastName)
            user.phoneNumber = data.get('phoneNumber', user.phoneNumber)

            # Commit the changes
            session.commit()
            return jsonify(message="User updated successfully"), 200
        else:
            return jsonify(message="No user with that ID found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Failed to update user"), 500

@app_routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """ 
    Deleting a user by ID
    
    Args:
        user_id (int): The ID of the user to delete
        
    Returns:
        response (json): Success message or error message
    """
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if user:
            session.delete(user)
            session.commit()
            return jsonify(message="User deleted successfully"), 204
        else:
            return jsonify(message="No user with that ID found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Failed to delete user"), 500
