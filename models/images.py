from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Image(BaseModel):
    """Model for storing image metadata."""
    __tablename__ = "images"  # Specify the table name

    filename = Column(String, nullable=False)
    """Name of the image file"""
    
    filepath = Column(String, nullable=False)
    """Path where the image file is stored"""

    recipients = Column(String)
    
    size = Column(Integer)
    """Size of the image file in bytes"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who uploaded the image"""
