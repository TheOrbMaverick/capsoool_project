from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Video(BaseModel):
    """Model for storing video metadata."""
    __tablename__ = "videos"  # Specify the table name

    title = Column(String, nullable=False)
    """Name of the video file"""
    
    video = Column(String, nullable=False)
    """Path where the video file is stored"""

    recipients = Column(String)

    size = Column(Integer, nullable=False)
    """Size of the video file in bytes"""

    thumbnail = Column(String, nullable=False)
    """Path where the video file is stored"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who uploaded the video"""
