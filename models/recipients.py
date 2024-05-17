from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Recipient(BaseModel):
    __tablename__ = "recipients"

    email = Column(String, nullable = False, unique=True)
    first_name = Column(String, nullable = False)
    last_name = Column(String, nullable = False) 
    phone_number = Column(String, nullable = False)
    updated_at = Column(DateTime, default=datetime.now)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))
