from models import Base
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Image(Base):
    """Model for storing image metadata."""
    __tablename__ = "images" 

    id = Column(Integer, primary_key=True)

    filename = Column(String, nullable=False)
    """Name of the image file"""
    
    filepath = Column(String, nullable=False)
    """Path where the image file is stored"""
    
    size = Column(Integer)
    """Size of the image file in bytes"""

    authorId = Column(ForeignKey('users.id'))
    """ID of the user who uploaded the image"""

    createdAt = Column(DateTime, default=datetime.now)

    author = relationship("User", back_populates="images")

    recipients = relationship("Recipient", secondary="image_recipients", back_populates="images")
