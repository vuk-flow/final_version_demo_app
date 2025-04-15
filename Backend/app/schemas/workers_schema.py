from pydantic import BaseModel, EmailStr
from typing import Optional

class WorkerCreate(BaseModel):
    email: EmailStr
    name: str

class Worker(WorkerCreate):
    id: int

    class Config:
        orm_mode = True

class WorkerUpdate(BaseModel):
    name:Optional[str] = None
    email:Optional[EmailStr] = None
