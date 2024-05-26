from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from models.user import User
from datetime import datetime
from models import session

if __name__ == "__main__":

    # Creating users
    new_user_1 = User(
        email='ita@example.com',
        first_name='Ita',
        last_name='Enang',
        phone_number='425667890',
        password='123456'
    )

    new_user_2 = User(
        email='test@example.com',
        first_name='John',
        last_name='Doe',
        phone_number='1234567890',
        last_login=datetime.now(),
        confirmed_email=1,
        password='123456'
    )

    new_user_3 = User(
        email='thelma@example.com',
        first_name='Thelma',
        last_name='Enang',
        phone_number='1234567890',
        last_login=datetime.now(),
        confirmed_email=1,
        password='123456'
    )

    # Add users to the session and commit
    session.add(new_user_1)
    session.add(new_user_2)
    session.add(new_user_3)
    session.commit()