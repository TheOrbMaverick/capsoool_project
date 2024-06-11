from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Recipient(BaseModel):
    """Model for storing recipient information."""
    __tablename__ = "recipients"  # Specify the table name

    email = Column(String, nullable=False, unique=True)
    """Recipient's email address"""
    
    first_name = Column(String, nullable=False)
    """Recipient's first name"""
    
    last_name = Column(String, nullable=False)
    """Recipient's last name"""
    
    phone_number = Column(String, nullable=False)
    """Recipient's phone number"""
    
    updated_at = Column(DateTime, default=datetime.now)
    """Timestamp for when the record was last updated"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who added the recipient"""
