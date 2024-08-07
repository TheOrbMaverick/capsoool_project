from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
import bcrypt

class User(BaseModel):
    """
    User model for storing user information and managing user-related operations.

    Attributes:
        __tablename__ (str): Name of the table in the database.
        email (str): User's email address. Must be unique and not nullable.
        firstName (str): User's first name. Not nullable.
        lastName (str): User's last name. Not nullable.
        phoneNumber (str): User's phone number.
        lastLogin (datetime): Timestamp of the user's last login. Defaults to the current datetime.
        confirmed_email (int): Indicator if the user's email is confirmed (0 for false, 1 for true). Defaults to 0.
        updatedAt (datetime): Timestamp of the last update to the user's record. Defaults to the current datetime.
        user_image (str): URL or path to the user's image.
        _password (str): Hashed password of the user. Not readable directly.
        tier (int): User's subscription tier. Defaults to 0.
        images (relationship): One-to-many relationship with the Image model.
        trusted_people (relationship): One-to-many relationship with the Trusted model.
        texts (relationship): One-to-many relationship with the Text model.
        videos (relationship): One-to-many relationship with the Video model.
        recipients (relationship): One-to-many relationship with the Recipient model.
    """
    
    __tablename__ = "users"

    email = Column(String, nullable=False, unique=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False) 
    phoneNumber = Column(String)
    lastLogin = Column(DateTime, default=datetime.now)
    confirmed_email = Column(Integer, default=0)
    updatedAt = Column(DateTime, default=datetime.now)
    user_image = Column(String)

    _password = Column("password", String, nullable=False)
    tier = Column(Integer, default=0)

    # Define the relationships
    trusted_people = relationship("Trusted", back_populates="author")
    recipients = relationship("Recipient", back_populates="author")

    # Relationships
    videos = relationship("Video", back_populates="author")
    images = relationship("Image", back_populates="author")
    texts = relationship("Text", back_populates="author")

    @property
    def password(self):
        """
        Prevents direct reading of the password attribute.

        Raises:
            AttributeError: If an attempt is made to read the password.
        """
        raise AttributeError("Password is not a readable attribute")

    @password.setter
    def password(self, plaintext_password):
        """
        Hashes the plaintext password and stores it.

        Args:
            plaintext_password (str): The plaintext password to be hashed and stored.
        """
        hashed_password = bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt())
        self._password = hashed_password.decode('utf-8')

    def verify_password(self, plaintext_password):
        """
        Verifies the given plaintext password against the stored hashed password.

        Args:
            plaintext_password (str): The plaintext password to be verified.

        Returns:
            bool: True if the password matches, False otherwise.
        """
        return bcrypt.checkpw(plaintext_password.encode('utf-8'), self._password.encode('utf-8'))
