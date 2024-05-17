from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from models import create_table

class Video(BaseModel):
    __tablename__ = "videos"

    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False) 
    sze = Column(Integer, nullable = False)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))

create_table()
