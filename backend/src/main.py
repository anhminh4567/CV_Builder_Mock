from fastapi import FastAPI

from src.routers import cv_scan
from src.environment import load_environment_variables
from src.middleware.exceptionMiddleware import ExceptionHandlerMiddleware


load_environment_variables()

app = FastAPI()
app.title = "My FastAPI Application"
app.description = "This is a simple FastAPI application."
app.add_middleware(ExceptionHandlerMiddleware)


app.include_router(cv_scan.router)
# app.include_router(chat.router)
# app.include_router(cv_scan.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
