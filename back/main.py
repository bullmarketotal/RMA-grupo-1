from typing import Union
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from back.sensores.router import router as sensores_router
from fastapi import FastAPI

# importamos los routers desde nuestros modulos
#from router import router

app = FastAPI()

# asociamos los routers a nuestra app
app.include_router(sensores_router)
