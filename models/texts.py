from .base import BaseModel
from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
from datetime import datetime
from models import create_table

class Text(BaseModel):
    __tablename__ = 'texts'

    title = Column(Text)
    content = Column(Text)
    recipients = Column(String)
    updated_at = Column(DateTime, default=datetime.now)

    # Define the author column
    author_id = Column(ForeignKey('users.id'))

create_table()
