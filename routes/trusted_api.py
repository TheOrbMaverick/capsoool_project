from routes import app_routes, session
from models.user import User

@app_routes.route('/trusted', strict_slashes=True)
def trusted():
    """
    Route to retrieve all trusted users.
    
    This route queries all users from the database and returns a message indicating 
    it is the API for the TRUST page. It also prints the list of users to the console.
    
    Returns:
        str: A message indicating this is the TRUST page API.
    """
    trust = []

    # Querying all users from the database
    users = session.query(User)
    for user in users:
        trust.append(user)

    # Printing the list of trusted users to the console
    print(trust)
    
    return "This is your api for the TRUST page"
