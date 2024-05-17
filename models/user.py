from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from models import create_table

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String, nullable = False, unique=True)
    first_name = Column(String, nullable = False)
    last_name = Column(String, nullable = False) 
    phone_number = Column(String, nullable = False)
    last_login = Column(DateTime, default=datetime.now)
    confirmed_email = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.now)

    # Note the underscore to indicate private use
    _password = Column("password", String, nullable=False)
    tier = Column(Integer, default=0)

    # # Define the relationships
    images = relationship("Image")
    trusted_people = relationship("Trusted")
    texts = relationship("Text")
    videos = relationship("Video")
    recipients = relationship("Recipient")

create_table()
