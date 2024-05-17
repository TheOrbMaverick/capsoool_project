from sqlalchemy import create_engine
from models.base import Base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///./capsoool.db', echo=False)
Session = sessionmaker(bind=engine)
session = Session()

def create_table():
    Base.metadata.create_all(engine, checkfirst=True)