import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .models import ModeloBase
from .depends.router_sub import router as router_sub
from .paquete.router import router as paquetes_router
from .permisos.router import router as permisos_router
from .nodos.router import router as sensores_router
from .usuarios.router import router as usuarios_router
from .roles.router import router as roles_router
from .rango_valores.router import router as config_router
from .auth.router import router as auth_router
from .alertas.router import router as alertas_router
from .rango_alertas.router import router as rango_alertas_router
from .cuencas.router import router as cuencas_router
from .carga_db import init_db

# Cargar variables de entorno
load_dotenv()
ENV = os.getenv("ENV")
ROOT_PATH = os.getenv(f"ROOT_PATH_{ENV.upper()}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    ModeloBase.metadata.create_all(bind=engine)
    init_db()
    yield
    print("Aplicación FastAPI cerrada.")

app = FastAPI(root_path=ROOT_PATH, lifespan=lifespan)

# Configuración de CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173", "localhost"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(permisos_router)
app.include_router(sensores_router)
app.include_router(paquetes_router)
app.include_router(usuarios_router)
app.include_router(roles_router)
app.include_router(auth_router)
app.include_router(config_router)
app.include_router(alertas_router)
app.include_router(rango_alertas_router)
app.include_router(cuencas_router)
app.include_router(router_sub)

