from datetime import datetime
from sqlalchemy import create_engine

from models.base import VideoRecipients, ImageRecipients, TextRecipients
from models.images import Image
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from models.user import User
from models import session


# Create dummy users
user1 = User(email='ita@example.com', firstName='Ita', lastName='Enang', phoneNumber='425667890', password='123456')
user2 = User(email='john@example.com', firstName='John', lastName='Doe', phoneNumber='1234567890', password='123456')
user3 = User(email='thelma@example.com', firstName='Thelma', lastName='Enang', phoneNumber='1234567890', password='123456')

session.add_all([user1, user2, user3])
session.commit()

# Create dummy recipients
recipient1 = Recipient(email='rec1@example.com', firstName='Rec1', lastName='User1', phoneNumber='1234567890', author=user1)
recipient2 = Recipient(email='rec2@example.com', firstName='Rec2', lastName='User2', phoneNumber='1234567891', author=user2)
recipient3 = Recipient(email='rec3@example.com', firstName='Rec3', lastName='User3', phoneNumber='1234567892', author=user3)

session.add_all([recipient1, recipient2, recipient3])
session.commit()

# Create dummy videos
video1 = Video(title='Video1', video='path/to/video1.mp4', size=1234, thumbnail='path/to/thumbnail1.jpg', author=user1)
video2 = Video(title='Video2', video='path/to/video2.mp4', size=5678, thumbnail='path/to/thumbnail2.jpg', author=user2)
video3 = Video(title='Video3', video='path/to/video3.mp4', size=9101, thumbnail='path/to/thumbnail3.jpg', author=user3)

session.add_all([video1, video2, video3])
session.commit()

# Create dummy images
image1 = Image(title='Image1', image='path/to/image1.jpg', size=2345, author=user1)
image2 = Image(title='Image2', image='path/to/image2.jpg', size=6789, author=user2)
image3 = Image(title='Image3', image='path/to/image3.jpg', size=1011, author=user3)

session.add_all([image1, image2, image3])
session.commit()

# Create dummy texts
text1 = Text(title='Text1', content='This is the content of text1', author=user1)
text2 = Text(title='Text2', content='This is the content of text2', author=user2)
text3 = Text(title='Text3', content='This is the content of text3', author=user3)

session.add_all([text1, text2, text3])
session.commit()

# Add video recipients
video_recipient1 = VideoRecipients(recipientId=recipient1.id, videoId=video1.id, authorId=user1.id)
video_recipient2 = VideoRecipients(recipientId=recipient2.id, videoId=video2.id, authorId=user2.id)
video_recipient3 = VideoRecipients(recipientId=recipient3.id, videoId=video3.id, authorId=user3.id)

session.add_all([video_recipient1, video_recipient2, video_recipient3])
session.commit()

# Add image recipients
image_recipient1 = ImageRecipients(recipientId=recipient1.id, imageId=image1.id, authorId=user1.id)
image_recipient2 = ImageRecipients(recipientId=recipient2.id, imageId=image2.id, authorId=user2.id)
image_recipient3 = ImageRecipients(recipientId=recipient3.id, imageId=image3.id, authorId=user3.id)

session.add_all([image_recipient1, image_recipient2, image_recipient3])
session.commit()

# Add text recipients
text_recipient1 = TextRecipients(recipientId=recipient1.id, textId=text1.id, authorId=user1.id)
text_recipient2 = TextRecipients(recipientId=recipient2.id, textId=text2.id, authorId=user2.id)
text_recipient3 = TextRecipients(recipientId=recipient3.id, textId=text3.id, authorId=user3.id)

session.add_all([text_recipient1, text_recipient2, text_recipient3])
session.commit()

print("Dummy data added successfully.")
