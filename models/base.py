
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, DateTime
from datetime import datetime

# Create a base class for declarative class definitions
Base = declarative_base()

class BaseModel(Base):
    """Base class for all models with common attributes."""
    __abstract__ = True  # Mark this class as abstract (won't be mapped to a table)
    __allow_unmapped__ = True  # Allow unmapped properties

    id = Column(Integer, primary_key=True)
    """Primary key column"""

    created_at = Column(DateTime, default=datetime.now)
    """Timestamp for when the record was created"""
