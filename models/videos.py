from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Video(Base):
    """Model for storing video metadata."""
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)
    """Name of the video file"""
    
    video = Column(String, nullable=False)
    """Path where the video file is stored"""

    size = Column(Integer, nullable=False)
    """Size of the video file in bytes"""

    thumbnail = Column(String, nullable=False)
    """Path where the video file is stored"""

    authorId = Column(ForeignKey('users.id'))
    """ID of the user who uploaded the video"""

    createdAt = Column(DateTime, default=datetime.now)
    
    author = relationship("User", back_populates="videos")

    recipients = relationship("Recipient", secondary="video_recipients", back_populates="videos")
