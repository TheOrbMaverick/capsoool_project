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
        firstName='John',
        lastName='Doe',
        phoneNumber='123-456-7890',
        updatedAt=datetime.now(),
        tp_image='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=1
    )

    new_trusted_2 = Trusted(
        email='user1_trusted2@example.com',
        firstName='Jane',
        lastName='Smith',
        phoneNumber='234-567-8901',
        updatedAt=datetime.now(),
        tp_image='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=1
    )

    new_trusted_3 = Trusted(
        email='user1_trusted3@example.com',
        firstName='Jim',
        lastName='Beam',
        phoneNumber='345-678-9012',
        updatedAt=datetime.now(),
        tp_image='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=1
    )

    new_trusted_4 = Trusted(
        email='user2_trusted1@example.com',
        firstName='Alice',
        lastName='Johnson',
        phoneNumber='456-789-0123',
        updatedAt=datetime.now(),
        tp_image='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=2
    )

    new_trusted_5 = Trusted(
        email='user2_trusted2@example.com',
        firstName='Bob',
        lastName='Williams',
        phoneNumber='567-890-1234',
        updatedAt=datetime.now(),
        tp_image='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=2
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
