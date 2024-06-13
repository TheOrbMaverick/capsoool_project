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
        first_name='Selema',
        last_name='Enang',
        phone_number='425667890',
        author_id=1
    )

    new_user_2 = Recipient(
        email='elam@example.com',
        first_name='Elam',
        last_name='Murphy',
        phone_number='1234567890',
        author_id=1
    )

    new_user_3 = Recipient(
        email='thelma@example.com',
        first_name='Thelma',
        last_name='Enang',
        phone_number='1234567890',
        author_id=1
    )

    # Add users to the session and commit
    session.add(new_user_1)
    session.add(new_user_2)
    session.add(new_user_3)
    session.commit()