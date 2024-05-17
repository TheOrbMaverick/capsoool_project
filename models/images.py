from .base import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from models import create_table

class Image(BaseModel):
    __tablename__ = "images"

    filename = Column(String, nullable = False)
    filepath = Column(String, nullable = False) 
    sze = Column(Integer, nullable = False)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))

create_table()
