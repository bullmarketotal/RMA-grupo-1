from typing import List


from fastapi import HTTPException
from sqlalchemy.orm import Session

from back.usuarios import schemas
from back.usuarios.models import Usuario


def listar_usuarios(db: Session) -> List[Usuario]:
    return Usuario.get_all(db)


def update_usuario(db: Session, user_id, user_data) -> schemas.Usuario:
    usuario = Usuario.get(user_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    usuario.update(db, user_data)
    return schemas.Usuario.model_validate(usuario)


def get_user_by_username(db: Session, username: str):
    return Usuario.find_first(db, username=username)


def get_user_activo_by_username(db: Session, username: str):
    return Usuario.find_first(db, username=username, is_active=True)


def get_ususario(db: Session, user_id: int):
    return Usuario.get(db, user_id)
