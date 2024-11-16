import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from jose import JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from ..usuarios.models import Usuario
from ..usuarios.schemas import Usuario as UsuarioSchema
from ..usuarios.schemas import UsuarioCreate
from .schemas import TokenData

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
TOKEN_EXPIRE_MINUTES = int(os.getenv("TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_user_from_token(db: Session, token: str) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("id")
        if user_id is None:
            raise credentials_exception
        user = db.query(Usuario).filter(Usuario.id == user_id).first()
        if user is None:
            raise credentials_exception
        return user
    except jwt.InvalidTokenError as e:
        raise credentials_exception from e


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(Usuario).filter(Usuario.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user


def create_refresh_token(
    data: dict, expires_delta: timedelta = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_access_token(
    data: dict, expires_delta: timedelta = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def refresh_access_token(db: Session, refresh_token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decodificar refresh_token
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("id")

        if user_id is None:
            raise credentials_exception
        user = db.query(Usuario).filter(Usuario.id == user_id).first()
        if user is None:
            raise credentials_exception

        # Verificar si el refresh_token expiró
        exp: int = payload.get("exp")
        if exp is None or datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(
            timezone.utc
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

        new_access_token = create_access_token(
            data={
                "id": user.id,
                "username": user.username,
                "roles": [role.name for role in user.roles],
            }
        )
        new_refresh_token = create_refresh_token(
            data={"id": user.id, "username": user.username}
        )

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer",
        }

    except jwt.InvalidTokenError as e:
        raise credentials_exception from e


def crear_usuario(db: Session, usuario: UsuarioCreate) -> Usuario:
    hashed_password = hash_password(usuario.password)
    usuario_dict = usuario.model_dump()
    usuario_dict["hashed_password"] = hashed_password
    del usuario_dict["password"]
    usuario_creado = Usuario(**usuario_dict)

    usuario_creado = usuario_creado.save(db)
    return UsuarioSchema.model_validate(usuario_creado)


# def crear_usuario(db: Session, usuario: UsuarioCreate) -> UsuarioSchema:
#     hashed_password = hash_password(usuario.password)
#     new_usuario = Usuario.create(
#         db, UsuarioCreate(username=usuario.username, password=hashed_password)
#     )
#     return UsuarioSchema.model_validate(new_usuario)


# def crear_usuario(db: Session, usuario: UsuarioCreate) -> UsuarioSchema:
#     hashed_password = hash_password(usuario.password)
#     new_usuario = Usuario.create(
#         db, Usuario(username=usuario.username, hashed_password=hashed_password)
#     )
#     return UsuarioSchema.model_validate(new_usuario)


# def crear_usuario(db: Session, usuario: UsuarioCreate) -> Usuario:
#     hashed_password = hash_password(usuario.password)
#     new_usuario = UsuarioSchema()


# def crear_usuario(db: Session, usuario: schemas.UsuarioCreate) -> Usuario:
#     new_usuario = schemas.UsuarioCreate(
#         user=usuario.user,
#         password=pwd_context.hash(usuario.password),
#     )
#     return Usuario.create(db, new_usuario)
