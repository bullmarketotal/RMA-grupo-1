import json
import os
import signal
import sys
import threading
from contextlib import asynccontextmanager

import paho.mqtt.client as paho
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .depends.config import config
from .depends.paquetes import mi_callback
from .depends.sub import Subscriptor
from .models import ModeloBase
from .paquete.router import router as paquetes_router
from .permisos.router import router as permisos_router
from .nodos.router import router as sensores_router
from .usuarios.router import router as usuarios_router
from .roles.router import router as roles_router
from .auth.router import router as auth_router
from .alertas.router import router as alertas_router
from .carga_db import init_db

# Cargar configuración global
CONFIG = {}


def cargar_configuracion():
    global CONFIG
    ruta = os.path.join(os.path.dirname(__file__), "config.json")
    if os.path.exists(ruta):
        with open(ruta, "r") as archivo:
            CONFIG = json.load(archivo)
    else:
        print("Advertencia: config.json no encontrado.")


cargar_configuracion()

# Cargar variables de entorno
load_dotenv()
ENV = os.getenv("ENV")
ROOT_PATH = os.getenv(f"ROOT_PATH_{ENV.upper()}")

# Variable para asegurar que el subscriptor solo se cree una vez
subscriptor_iniciado = False


def iniciar_thread() -> None:
    global subscriptor_iniciado
    if not subscriptor_iniciado:
        subscriptor_iniciado = True
        sub = Subscriptor(client=paho.Client(), on_message_callback=mi_callback)
        sub.connect(config.host, config.port, config.keepalive)
    else:
        print("El hilo del suscriptor ya está en ejecución.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    ModeloBase.metadata.create_all(bind=engine)
    init_db()
    thread_sub = threading.Thread(target=iniciar_thread, daemon=True)
    thread_sub.start()
    print("El suscriptor se está ejecutando.")

    def signal_handler(sig, frame):
        print("Recibida señal de interrupción en (Ctrl+C). Deteniendo el suscriptor...")
        if hasattr(Subscriptor, "should_exit"):
            Subscriptor.should_exit = True
        if thread_sub.is_alive():
            print("Esperando que el hilo del suscriptor termine...")
            thread_sub.join()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)
    yield
    print("Finalizando la aplicación...")
    if thread_sub.is_alive():
        print("Esperando que el hilo del suscriptor termine...")
        thread_sub.join()
    print("Aplicación FastAPI cerrada.")


app = FastAPI(root_path=ROOT_PATH, lifespan=lifespan)

origins = ["http://localhost:5173", "http://127.0.0.1:5173", "localhost"]

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(permisos_router)
app.include_router(sensores_router)
app.include_router(paquetes_router)
app.include_router(usuarios_router)
app.include_router(roles_router)
app.include_router(auth_router)
app.include_router(alertas_router)
