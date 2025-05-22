from fastapi import FastAPI

from src.routers import cv_scan
from src.environment import load_environment_variables
from src.middleware.exceptionMiddleware import ExceptionHandlerMiddleware
from fastapi.middleware.cors import CORSMiddleware


load_environment_variables()
origins = [
    # "http://localhost:5173",
    # "http://localhost:8080",
    "*",
]


app = FastAPI()
app.title = "My FastAPI Application"
app.description = "This is a simple FastAPI application."
app.add_middleware(ExceptionHandlerMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_scan.router)
# app.include_router(chat.router)
# app.include_router(cv_scan.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
