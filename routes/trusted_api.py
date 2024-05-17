from routes import app_routes, session
from models.user import User


@app_routes.route('/trusted', strict_slashes=True)
def trusted():
    trust = []

    users = session.query(User)
    for user in users:
        trust.append(user)

    print(trust)
    return "This is your api for the TRUST page"
