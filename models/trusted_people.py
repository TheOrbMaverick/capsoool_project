from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Trusted(BaseModel):
    __tablename__ = "trusted_people"

    email = Column(String, nullable = False, unique=True)
    first_name = Column(String, nullable = False)
    last_name = Column(String, nullable = False) 
    phone_number = Column(String, nullable = False)
    updated_at = Column(DateTime, default=datetime.now)
    tp_image = Column(String)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))
