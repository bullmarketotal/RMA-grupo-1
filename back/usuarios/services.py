import os
from datetime import UTC, datetime, timedelta
from typing import List

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from back.usuarios import schemas
from back.usuarios.models import Usuario

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
TOKEN_EXPIRE_MINUTES = int(os.getenv("TOKEN_EXPIRE_MINUTES"))

from passlib.context import CryptContext

# contexto de encriptación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def listar_usuarios(db: Session) -> List[Usuario]:
    return Usuario.get_all(db)


def crear_usuario(db: Session, usuario: schemas.UsuarioCreate) -> Usuario:
    new_usuario = Usuario(
        usuario=usuario.usuario,
        password=pwd_context.hash(usuario.password),
        date=datetime.now(UTC),
    )

    print(
        f"Usuario creado: username - {new_usuario.usuario}, password (hashed) - {new_usuario.password}"
    )
    return Usuario.create(db, new_usuario)


def autenticar_usuario(db: Session, usuario: str, password: str):
    db_usuario = db.query(Usuario).filter(Usuario.usuario == usuario).first()

    if pwd_context.verify(password, db_usuario.password):
        print("La contraseña es correcta")

    if not db_usuario:
        raise HTTPException(status_code=400, detail="No se encontró el usuario")
    if not pwd_context.verify(password, db_usuario.password):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    return db_usuario


def crear_token(data: dict, expire_minutes: timedelta = None):
    data_encode = data.copy()
    if expire_minutes:
        expire = datetime.now(UTC) + expire_minutes
    else:
        expire = datetime.now(UTC) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    data_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(data_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def login_usuario(db: Session, usuario: schemas.UsuarioBase) -> crear_token:
    db_usuario = autenticar_usuario(db, usuario.usuario, usuario.password)

    token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    token = crear_token(data={"sub": db_usuario.usuario}, expire_minutes=token_expires)
    return {"token": token, "token_type": "bearer"}
