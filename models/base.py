from sqlalchemy import Column, DateTime
from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
import uuid
from models import Base


class BaseModel(Base):
    """Base class for all models with common attributes."""
    __abstract__ = True  # Mark this class as abstract (won't be mapped to a table)
    __allow_unmapped__ = True  # Allow unmapped properties
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    createdAt = Column(DateTime, default=datetime.now)


class VideoRecipients(Base):
    __tablename__ = "video_recipients"
    id = Column(Integer, primary_key=True)
    recipientId = Column(Integer, ForeignKey('recipients.id'), nullable=False)
    videoId = Column(Integer, ForeignKey('videos.id'), nullable=False)
    authorId = Column(Integer, ForeignKey('users.id'), nullable=False)


class ImageRecipients(Base):
    __tablename__ = "image_recipients"
    id = Column(Integer, primary_key=True)
    recipientId = Column(Integer, ForeignKey('recipients.id'), nullable=False)
    imageId = Column(Integer, ForeignKey('images.id'), nullable=False)
    authorId = Column(Integer, ForeignKey('users.id'), nullable=False)


class TextRecipients(Base):
    __tablename__ = "text_recipients"
    id = Column(Integer, primary_key=True)
    recipientId = Column(Integer, ForeignKey('recipients.id'), nullable=False)
    textId = Column(Integer, ForeignKey('texts.id'), nullable=False)
    authorId = Column(Integer, ForeignKey('users.id'), nullable=False)
