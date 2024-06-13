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

    new_image_1 = Image(

        filename= 'image1.jpg',
        filepath= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Radical Ebube',
        size= 204800,
        author_id= 1
    )

    new_image_2 = Image(

        filename= 'image2.jpg',
        filepath= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Ekoh-Chukwukelu Chukwudubem, Liana Rida',
        size= 409600,
        author_id= 1
    )

    new_image_3 = Image(

        filename= 'image3.jpg',
        filepath= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Manny Lou, Ellie Joel',
        size= 102400,
        author_id= 1
    )
    
    # Add users to the session and commit
    session.add(new_image_1)
    session.add(new_image_2)
    session.add(new_image_3)
    session.commit()
