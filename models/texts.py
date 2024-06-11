from .base import BaseModel
from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

class Text(BaseModel):
    """Model for storing text messages."""
    __tablename__ = 'texts'  # Specify the table name

    title = Column(Text)
    """Title of the text message"""
    
    content = Column(Text)
    """Content of the text message"""
    
    recipients = Column(String)
    """List of recipients for the text message"""
    
    updated_at = Column(DateTime, default=datetime.now)
    """Timestamp for when the text message was last updated"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who created the text message"""