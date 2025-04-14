from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
# from app.schemas import workers_schema
# from app.models import workers_model
from Backend.app.database import SessionLocal
from Backend.app.schemas.workers_schema import Worker as WorkerSchema
from Backend.app.models.workers_model import Worker
from Backend.app.schemas.workers_schema import WorkerCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/workers/", response_model=list[WorkerSchema])
def get_all_workers(db: Session = Depends(get_db)):
    workers = db.query(Worker).all()
    return workers 

@router.get('/workers/{id}', response_model= WorkerSchema)
def get_worker_by_id(id:int, db:Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == id).first()
    if worker is None:
        raise HTTPException(status_code=404, detail=f"Worker with {id=} not found")

    return worker

@router.post('/workers/', response_model=WorkerSchema)
def create_worker(worker: WorkerCreate, db : Session = Depends(get_db)):
    db_worker = Worker(**worker.model_dump())

    exist_already = db.query(Worker).filter(Worker.email == worker.email).first()
    
    if exist_already:
        raise HTTPException(status_code=400, detail='Email already exist')
    
    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)

    return db_worker
    