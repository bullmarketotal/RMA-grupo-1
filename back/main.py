from typing import Union
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from back.sensores.router import router as sensores_router
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

ENV = os.getenv("ENV")
ROOT_PATH = os.getenv(f"ROOT_PATH_{ENV.upper()}")

@asynccontextmanager
async def db_creation_lifespan(app: FastAPI):
    BaseModel.metadata.create_all(bind=engine)
    yield


app = FastAPI(root_path=ROOT_PATH, lifespan=db_creation_lifespan)


# asociamos los routers a nuestra app
app.include_router(sensores_router)
