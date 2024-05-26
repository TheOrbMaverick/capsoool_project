from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Image(BaseModel):
    __tablename__ = "images"

    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False) 
    size = Column(Integer)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))
