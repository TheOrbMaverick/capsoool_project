from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Trusted(Base):
    """Model for storing trusted people information."""
    __tablename__ = "trusted_people"  # Specify the table name

    id = Column(Integer, primary_key=True)

    email = Column(String, nullable=False, unique=True)
    """Email of the trusted person"""
    
    firstName = Column(String, nullable=False)
    """First name of the trusted person"""
    
    lastName = Column(String, nullable=False)
    """Last name of the trusted person"""
    
    phoneNumber = Column(String, nullable=False)
    """Phone number of the trusted person"""
    
    updatedAt = Column(DateTime, default=datetime.now)
    """Timestamp for when the trusted person's record was last updated"""
    
    tp_image = Column(String)
    """Image path for the trusted person"""

    authorId = Column(ForeignKey('users.id'))
    """ID of the user who added the trusted person"""

    createdAt = Column(DateTime, default=datetime.now)

    author = relationship("User", back_populates="trusted_people")
