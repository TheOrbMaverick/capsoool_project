from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Video(BaseModel):
    """Model for storing video metadata."""
    __tablename__ = "videos"  # Specify the table name

    filename = Column(String, nullable=False)
    """Name of the video file"""
    
    filepath = Column(String, nullable=False)
    """Path where the video file is stored"""
    
    size = Column(Integer, nullable=False)
    """Size of the video file in bytes"""
    
    thumbnail = Column(String)
    """Path to the video's thumbnail image"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who uploaded the video"""