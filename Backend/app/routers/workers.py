from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.workers_schema import (
    LoginRequest,
    ResetPasswordRequest,
    EmailCheckRequest,
    Worker as WorkerSchema,
)
from app.models.workers_model import Worker
from app.schemas.workers_schema import WorkerCreate, WorkerUpdate
from app.file_reader import (
    pd,
    validate_csv,
    field_rules,
    name_pattern,
    email_pattern,
    re,
)
from app.security import hash_password, verify_password, create_access_token


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
    if not workers:
        return []
    return workers


@router.get("/workers/{id}", response_model=WorkerSchema)
def get_worker_by_id(id: int, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == id).first()
    if worker is None:
        raise HTTPException(status_code=404, detail=f"Worker with {id=} not found")

    return worker


@router.post("/workers/", response_model=WorkerSchema)
def create_worker(worker: WorkerCreate, db: Session = Depends(get_db)):
    db_worker = Worker(**worker.model_dump())

    exist_already = db.query(Worker).filter(Worker.email == worker.email).first()

    if exist_already:
        raise HTTPException(status_code=400, detail="Email already exist")

    if re.match(name_pattern, worker.name) is None:
        print("Invalid name:", worker.name)
        raise HTTPException(status_code=400, detail="Name must contain only letters!")

    if re.match(email_pattern, worker.email) is None:
        print("Invalid name:", worker.email)
        raise HTTPException(status_code=400, detail="Email address is not valid!")

    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)

    return db_worker


@router.post("/workers/csv/", response_model=list[WorkerSchema])
def post_from_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):

    try:
        df = pd.read_csv(file.file)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid CSV")

    errors = validate_csv(df, field_rules)
    if errors:
        raise HTTPException(status_code=400, detail=errors)

    df_list = df.to_dict(orient="records")

    inserted_workers = []

    for worker_data in df_list:
        if db.query(Worker).filter(Worker.email == worker_data["email"]).first():
            continue
        if worker_data.get("password") == "default":
            worker_data["password"] = hash_password("default")

        new_worker = Worker(**worker_data)
        db.add(new_worker)
        inserted_workers.append(new_worker)
    db.commit()
    for worker in inserted_workers:
        db.refresh(worker)

    return inserted_workers


@router.patch("/workers/edit/{id}", response_model=WorkerSchema)
def update_worker(id: int, worker_update: WorkerUpdate, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == id).first()

    if not worker:
        raise HTTPException(status_code=404, detail=f"Worker with {id=} not found")

    if worker_update.email and worker_update.email != worker.email:
        existing_email = (
            db.query(Worker).filter(Worker.email == worker_update.email).first()
        )
        if existing_email:
            raise HTTPException(status_code=400, detail=f"Email already exists")

    for key, value in worker_update.model_dump(exclude_unset=True).items():
        setattr(worker, key, value)

    db.commit()
    db.refresh(worker)

    return worker


@router.delete("/workers/delete/{id}", response_model=WorkerSchema)
def delete_worker_by_id(id: int, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == id).first()
    if worker is None:
        raise HTTPException(status_code=404, detail=f"Worker with {id=} not found")
    db.delete(worker)
    db.commit()

    return worker


@router.post("/register", response_model=WorkerSchema)
def register_worker(worker: WorkerCreate, db: Session = Depends(get_db)):
    existing = db.query(Worker).filter(Worker.email == worker.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(worker.password)

    db_worker = Worker(name=worker.name, email=worker.email, password=hashed_password)

    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)

    return db_worker


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    existing_worker = db.query(Worker).filter(Worker.email == request.email).first()

    if not existing_worker or not verify_password(
        request.password, existing_worker.password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create the token here (assuming you already have the logic for token generation)
    access_token = create_access_token(data={"sub": existing_worker.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": existing_worker.id,
            "name": existing_worker.name,
            "email": existing_worker.email,
        },
    }


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.email == data.email).first()
    if not worker:
        raise HTTPException(
            status_code=404, detail="User with that email does not exist"
        )

    worker.password = hash_password(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}


@router.post("/check-email")
def check_email(request: EmailCheckRequest, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.email == request.email).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Email not found")
    return {"message": "Email exists"}
