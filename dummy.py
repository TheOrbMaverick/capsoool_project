from models import session
from models.user import User
from models.recipients import Recipient
from models.videos import Video
from datetime import datetime

if __name__ == "__main__":
    # Creating users
    user1 = User(
        email='john@example.com',
        firstName='John',
        lastName='Doe',
        phoneNumber='1234567890',
        password='password1',
        user_image='path/to/image1.jpg',
        tier=0
    )

    user2 = User(
        email='jane@example.com',
        firstName='Jane',
        lastName='Smith',
        phoneNumber='0987654321',
        password='password2',
        user_image='path/to/image2.jpg',
        tier=2
    )

    user3 = User(
        email='bob@example.com',
        firstName='Bob',
        lastName='Brown',
        phoneNumber='1122334455',
        password='password3',
        user_image='path/to/image3.jpg',
        tier=0
    )

    # Adding users to the session
    session.add_all([user1, user2, user3])
    session.commit()

    # Creating recipients
    recipient1 = Recipient(
        email='recipient1@example.com',
        firstName='Recipient1',
        lastName='LastName1',
        phoneNumber='5555555551',
        authorId=user1.id
    )

    recipient2 = Recipient(
        email='recipient2@example.com',
        firstName='Recipient2',
        lastName='LastName2',
        phoneNumber='5555555552',
        authorId=user2.id
    )

    recipient3 = Recipient(
        email='recipient3@example.com',
        firstName='Recipient3',
        lastName='LastName3',
        phoneNumber='5555555553',
        authorId=user3.id
    )

    # Adding recipients to the session
    session.add_all([recipient1, recipient2, recipient3])
    session.commit()

    # Creating videos
    video1 = Video(
        title='Video1',
        video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        size=1048576,
        thumbnail='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=user1.id
    )

    video2 = Video(
        title='Video2',
        video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        size=2097152,
        thumbnail='https://www.gstatic.com/webp/gallery3/1.sm.png',
        authorId=user1.id
    )

    video3 = Video(
        title='Video3',
        video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        size=3145728,
        thumbnail='https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        authorId=user1.id
    )

    # Adding videos to the session
    session.add_all([video1, video2, video3])
    session.commit()