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

    new_video_1 = Video(

        title= 'Video 1',
        video= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Julia Stille, Brad Adolphus, Young E. Chomiachukwu',
        size= 204800,
        thumbnail='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        author_id= 1
    )

    new_video_2 = Video(

        title= 'Video 2',
        video= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Radical Ebube',
        size= 409600,
        thumbnail='https://www.gstatic.com/webp/gallery3/1.sm.png',
        author_id= 1
    )

    new_video_3 = Video(

        title= 'Video 3',
        video= 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        recipients= 'Chioma Anwo, Prestige Ebube',
        size= 102400,
        thumbnail='https://www.placecage.com/300/200',
        author_id= 1
    )
    
    # Add users to the session and commit
    session.add(new_video_1)
    session.add(new_video_2)
    session.add(new_video_3)
    session.commit()
