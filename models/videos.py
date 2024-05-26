from .base import BaseModel
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Video(BaseModel):
    __tablename__ = "videos"

    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False) 
    size = Column(Integer, nullable = False)
    thumbnail = Column(String)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))
