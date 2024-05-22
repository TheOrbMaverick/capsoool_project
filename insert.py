from models.images import Image
from models.trusted_people import Trusted
from models.recipients import Recipient
from models.videos import Video
from models.texts import Text
from models.user import User
from datetime import datetime
from models import session

if __name__ == "__main__":

    new_text_1 = Text(

            id= 1,
            title= "Meeting Reminder",
            content= "Don't forget about the team meeting tomorrow at 10 AM.",
            recipients= "team@example.com",
            created_at= datetime.now(),
            updated_at= datetime.now(),
            author_id= 2
        )

    new_text_2 = Text(
            id= 2,
            title= "Project Update",
            content= "The latest update on the project has been posted on the project board.",
            recipients= "project-team@example.com",
            created_at= datetime.now(),
            updated_at= datetime.now(),
            author_id= 1
        )

    new_text_3 = Text(
            id= 3,
            title= "Holiday Notice",
            content= "The office will be closed next Monday for the public holiday.",
            recipients= "all@example.com",
            created_at= datetime.now(),
            updated_at= datetime.now(),
            author_id= 1
        )
    
    # Add users to the session and commit
    session.add(new_text_1)
    session.add(new_text_2)
    session.add(new_text_3)
    session.commit()
