from typing import Union
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from back.sensores.router import router as sensores_router
from back.paquete.router import router as paquetes_router
from fastapi import FastAPI
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from back.database import engine
from back.models import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# importamos los routers desde nuestros modulos
#from router import router
load_dotenv()

ENV = os.getenv("ENV")
ROOT_PATH = os.getenv(f"ROOT_PATH_{ENV.upper()}")

@asynccontextmanager
async def db_creation_lifespan(app: FastAPI):
    BaseModel.metadata.create_all(bind=engine)
    yield


app = FastAPI(root_path=ROOT_PATH, lifespan=db_creation_lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# asociamos los routers a nuestra app
app.include_router(sensores_router)
app.include_router(paquetes_router)

