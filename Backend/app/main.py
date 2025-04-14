from fastapi import FastAPI, Depends
from Backend.app.routers import workers
from Backend.app.routers.workers import get_db
from Backend.app.database import engine, Base
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()




origins = [
      "http://localhost:3000",

]
app.add_middleware(
      CORSMiddleware,
    allow_origins=origins,  # Can also use ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workers.router,prefix='/api',tags=["Workers"])

@app.get("/")
def index():
    return {"message": "FastAPI is running!"}

@app.get("/test")
def test_db(db: Session = Depends(get_db)):
        try:
              db.execute(text("SELECT 1"))
              return {"status":"successful"}
        except Exception as e:
              return {"status": "Connection failed","error": str(e)}