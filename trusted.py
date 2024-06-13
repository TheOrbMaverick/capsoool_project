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

    new_trusted_1 = Trusted(
        email='user1_trusted1@example.com',
        first_name='John',
        last_name='Doe',
        phone_number='123-456-7890',
        updated_at=datetime.now(),
        tp_image='https://via.placeholder.com/300/09f/fff.png',
        author_id=1
    )

    new_trusted_2 = Trusted(
        email='user1_trusted2@example.com',
        first_name='Jane',
        last_name='Smith',
        phone_number='234-567-8901',
        updated_at=datetime.now(),
        tp_image='https://via.placeholder.com/300/09f/fff.png',
        author_id=1
    )

    new_trusted_3 = Trusted(
        email='user1_trusted3@example.com',
        first_name='Jim',
        last_name='Beam',
        phone_number='345-678-9012',
        updated_at=datetime.now(),
        tp_image='https://via.placeholder.com/300/09f/fff.png',
        author_id=1
    )

    new_trusted_4 = Trusted(
        email='user2_trusted1@example.com',
        first_name='Alice',
        last_name='Johnson',
        phone_number='456-789-0123',
        updated_at=datetime.now(),
        tp_image='https://via.placeholder.com/300/09f/fff.png',
        author_id=2
    )

    new_trusted_5 = Trusted(
        email='user2_trusted2@example.com',
        first_name='Bob',
        last_name='Williams',
        phone_number='567-890-1234',
        updated_at=datetime.now(),
        tp_image='https://via.placeholder.com/300/09f/fff.png',
        author_id=2
    )

    # Add to the session and commit to the database
    session.add(new_trusted_1)
    session.add(new_trusted_2)
    session.add(new_trusted_3)
    session.add(new_trusted_4)
    session.add(new_trusted_5)
    session.commit()

    # Close the session
    session.close()

    print("Dummy data inserted successfully.")
