from pydantic import BaseModel, EmailStr
from typing import Optional


class WorkerCreate(BaseModel):
    email: EmailStr
    name: str
    password: str


class Worker(WorkerCreate):
    id: int
    email: EmailStr
    name: str

    class Config:
        orm_mode = True


class WorkerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
