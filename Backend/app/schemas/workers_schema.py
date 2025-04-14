from pydantic import BaseModel, EmailStr

class WorkerCreate(BaseModel):
    email: EmailStr
    name: str

class Worker(WorkerCreate):
    id: int

    class Config:
        orm_mode = True
