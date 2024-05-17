from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
import bcrypt

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String, nullable = False, unique=True)
    first_name = Column(String, nullable = False)
    last_name = Column(String, nullable = False) 
    phone_number = Column(String)
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

    # Property for password hashing and verification
    @property
    def password(self):
        raise AttributeError("Password is not a readable attribute")

    @password.setter
    def password(self, plaintext_password):
        hashed_password = bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt())
        self._password = hashed_password.decode('utf-8')

    def verify_password(self, plaintext_password):
        return bcrypt.checkpw(plaintext_password.encode('utf-8'), self._password.encode('utf-8'))
