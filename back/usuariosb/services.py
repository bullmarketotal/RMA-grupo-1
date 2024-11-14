import os
from datetime import UTC, datetime, timedelta
from typing import List

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException
from jwt.exceptions import DecodeError, ExpiredSignatureError
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
    new_usuario = schemas.UsuarioCreate(
        user=usuario.user,
        password=pwd_context.hash(usuario.password),
    )
    return Usuario.create(db, new_usuario)


def autenticar_usuario(db: Session, usuario: str, password: str):
    db_usuario = db.query(Usuario).filter(Usuario.user == usuario).first()
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

    # Codifico el token
    encoded_jwt = jwt.encode(data_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def login_usuario(db: Session, usuario: schemas.UsuarioBase) -> crear_token:
    db_usuario = autenticar_usuario(db, usuario.user, usuario.password)

    token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)

    token = crear_token(data={"sub": db_usuario.user}, expire_minutes=token_expires)
    return {"token": token, "token_type": "bearer"}


def verificar_token(token: str) -> dict:
    try:
        # Decodifico el token
        payload = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)

        # Verificar la fecha
        if datetime.fromtimestamp(payload["exp"]) >= datetime.now():
            # Verificar que datos necesarios (roles y permisos)
            return payload
        else:
            raise ExpiredSignatureError("El token ha expirado")

    except DecodeError:
        raise Exception("Token inválido")
