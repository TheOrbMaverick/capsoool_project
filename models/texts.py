from .base import Base
from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

class Text(Base):
    """Model for storing text messages."""
    __tablename__ = 'texts'

    id = Column(Integer, primary_key=True)

    title = Column(Text)
    """Title of the text message"""
    
    content = Column(Text)
    """Content of the text message"""
    
    updatedAt = Column(DateTime, default=datetime.now)
    """Timestamp for when the text message was last updated"""

    authorId = Column(ForeignKey('users.id'))
    """ID of the user who created the text message"""

    createdAt = Column(DateTime, default=datetime.now)

    author = relationship("User", back_populates="texts")
