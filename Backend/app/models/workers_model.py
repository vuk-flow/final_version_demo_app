from sqlalchemy import Column, Integer, String
from app.database import Base


class Worker(Base):
    __tablename__ = "workers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(80))
    email = Column(String(80), unique=True, index=True)
    password = Column(String(255), nullable=False)
