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
    new_user_1 = Recipient(
        email='selema@example.com',
        firstName='Selema',
        lastName='Enang',
        phoneNumber='425667890',
        authorId=1
    )

    new_user_2 = Recipient(
        email='elam@example.com',
        firstName='Elam',
        lastName='Murphy',
        phoneNumber='1234567890',
        authorId=1
    )

    new_user_3 = Recipient(
        email='thelma@example.com',
        firstName='Thelma',
        lastName='Enang',
        phoneNumber='1234567890',
        authorId=1
    )

    # Add users to the session and commit
    session.add(new_user_1)
    session.add(new_user_2)
    session.add(new_user_3)
    session.commit()