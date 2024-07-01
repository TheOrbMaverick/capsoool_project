from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Recipient(Base):
    """Model for storing recipient information."""
    __tablename__ = "recipients"

    id = Column(Integer, primary_key=True)

    email = Column(String, nullable=False, unique=True)
    """Recipient's email address"""
    
    firstName = Column(String, nullable=False)
    """Recipient's first name"""
    
    lastName = Column(String, nullable=False)
    """Recipient's last name"""
    
    phoneNumber = Column(String, nullable=False)
    """Recipient's phone number"""
    
    updatedAt = Column(DateTime, default=datetime.now)
    """Timestamp for when the record was last updated"""

    authorId = Column(ForeignKey('users.id'))
    """ID of the user who added the recipient"""

    createdAt = Column(DateTime, default=datetime.now)

    author = relationship("User", back_populates="recipients")

    videos = relationship("Video", secondary="video_recipients", back_populates="recipients")

    images = relationship("Image", secondary="image_recipients", back_populates="recipients")

    texts = relationship("Text", secondary="text_recipients", back_populates="recipients")
