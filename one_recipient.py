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
        email='grace@example.com',
        first_name='Elizabeth',
        last_name='Nora',
        phone_number='425667890',
        author_id=1
    )

    # Add users to the session and commit
    session.add(new_user_1)
    session.commit()