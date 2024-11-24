import os
from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from ..usuarios.models import Usuario
from ..usuarios.schemas import Usuario as UsuarioSchema
from ..usuarios.schemas import UsuarioCreate
from .schemas import TokenData, TokenRefreshResponse
import bcrypt


load_dotenv()
SECRET_KEY = str(os.getenv("SECRET_KEY"))
ALGORITHM = str(os.getenv("ALGORITHM"))
TOKEN_EXPIRE_MINUTES = int(os.getenv("TOKEN_EXPIRE_MINUTES") or "30")
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS") or "7")


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


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


def authenticate_user(db: Session, username: str, password: str) -> Optional[Usuario]:
    user = db.query(Usuario).filter(Usuario.username == username).first()
    if user is None or not verify_password(password, user.hashed_password):
        return None
    return user


def create_refresh_token(
    data: dict, expires_delta: timedelta = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_access_token(
    data: dict, expires_delta: timedelta = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def refresh_access_token(db: Session, refresh_token: str) -> TokenRefreshResponse:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("id")

        if user_id is None:
            raise credentials_exception
        user = db.query(Usuario).filter(Usuario.id == user_id).first()
        if user is None:
            raise credentials_exception

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

        return TokenData(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise credentials_exception


def crear_usuario(db: Session, usuario: UsuarioCreate) -> UsuarioSchema:
    hashed_password = hash_password(usuario.password)
    usuario_dict = usuario.model_dump()
    usuario_dict["hashed_password"] = hashed_password
    del usuario_dict["password"]
    usuario_creado = Usuario(**usuario_dict)
    usuario_creado.save(db)
    return UsuarioSchema.model_validate(usuario_creado)


def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
