from sqlalchemy import create_engine
from models.base import Base
from sqlalchemy.orm import sessionmaker

# Create an engine to connect to the SQLite database
engine = create_engine('sqlite:///./capsoool.db', echo=False)

# Create a configured "Session" class
Session = sessionmaker(bind=engine)

# Create a Session instance
session = Session()

def create_table():
    """Create tables based on the Base's metadata."""
    Base.metadata.create_all(engine, checkfirst=True)