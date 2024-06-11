from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Trusted(BaseModel):
    """Model for storing trusted people information."""
    __tablename__ = "trusted_people"  # Specify the table name

    email = Column(String, nullable=False, unique=True)
    """Email of the trusted person"""
    
    first_name = Column(String, nullable=False)
    """First name of the trusted person"""
    
    last_name = Column(String, nullable=False)
    """Last name of the trusted person"""
    
    phone_number = Column(String, nullable=False)
    """Phone number of the trusted person"""
    
    updated_at = Column(DateTime, default=datetime.now)
    """Timestamp for when the trusted person's record was last updated"""
    
    tp_image = Column(String)
    """Image path for the trusted person"""

    author_id = Column(ForeignKey('users.id'))
    """ID of the user who added the trusted person"""