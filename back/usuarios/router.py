from datetime import datetime, UTC
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from back.database import get_db
from back.usuarios import schemas, services

router = APIRouter()

# Rutas para usuarios

router = APIRouter()


@router.post("/login")
def login(usuario: schemas.UsuarioBase, db: Session = Depends(get_db)):
    return services.login_usuario(db, usuario)


@router.post("/register")
def register(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return services.crear_usuario(db, usuario)


@router.get("/usuarios", response_model=list[schemas.Usuario])
def read_usuarios(db: Session = Depends(get_db)):
    return services.listar_usuarios(db)
