import os
import threading
from contextlib import asynccontextmanager
from typing import Union

import paho.mqtt.client as paho
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from back.database import engine
from back.models import ModeloBase
from back.paquete.router import router as paquetes_router
from back.sensores.router import router as sensores_router
from back.usuarios.router import router as usuarios_router
from back.roles.router import router as roles_router
from back.depends.config import config
from back.depends.paquetes import mi_callback
from back.depends.sub import Subscriptor

# importamos los routers desde nuestros modulos
# from router import router
load_dotenv()
ENV = os.getenv("ENV")
ROOT_PATH = os.getenv(f"ROOT_PATH_{ENV.upper()}")


def iniciar_thread() -> None:
    sub = Subscriptor(client=paho.Client(), on_message_callback=mi_callback)
    sub.connect(config.host, config.port, config.keepalive)


@asynccontextmanager
async def lifespan(app: FastAPI):
    ModeloBase.metadata.create_all(bind=engine)

    # Iniciar un hilo para el sub
    thread_sub = threading.Thread(target=iniciar_thread)
    thread_sub.start()
    print("El suscriptor se está ejecutando.")
    yield


app = FastAPI(root_path=ROOT_PATH, lifespan=lifespan)

origins = ["http://localhost:5173", "http://127.0.0.1:5173", "localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# asociamos los routers a nuestra app
app.include_router(sensores_router)
app.include_router(paquetes_router)
app.include_router(usuarios_router)
app.include_router(roles_router)
