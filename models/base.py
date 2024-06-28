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


class Content(Base):
    __tablename__ = 'contents'
    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    # Define relationships
    author = relationship("User", back_populates="contents")
    recipients = relationship("ContentRecipients", back_populates="content")


class ContentRecipients(Base):
    __tablename__ = "content_recipients"
    id = Column(Integer, primary_key=True)
    content_id = Column(Integer, ForeignKey('contents.id'), nullable=False)
    recipient_id = Column(Integer, ForeignKey('recipients.id'), nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    # Unique constraint to avoid duplicate entries
    __table_args__ = (UniqueConstraint('content_id', 'recipient_id', 'author_id', name='_content_recipient_uc'),)
    # Define relationships
    content = relationship("Content", back_populates="recipients")
    recipient = relationship("Recipient", back_populates="contents")
