from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from models.user import User
from datetime import datetime
from models import session

""" Run this file to add default data to the sqlite database"""

if __name__ == "__main__":

    # Creating users
    new_user_1 = User(
        email='ita@example.com',
        firstName='Ita',
        lastName='Enang',
        phoneNumber='425667890',
        password='123456'
    )

    new_user_2 = User(
        email='test@example.com',
        firstName='John',
        lastName='Doe',
        phoneNumber='1234567890',
        lastLogin=datetime.now(),
        confirmed_email=1,
        password='123456'
    )

    new_user_3 = User(
        email='thelma@example.com',
        firstName='Thelma',
        lastName='Enang',
        phoneNumber='1234567890',
        lastLogin=datetime.now(),
        confirmed_email=1,
        password='123456'
    )

    # Add users to the session and commit
    session.add(new_user_1)
    session.add(new_user_2)
    session.add(new_user_3)
    session.commit()
