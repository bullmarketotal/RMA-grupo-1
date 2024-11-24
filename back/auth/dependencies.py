from typing import List, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ..database import get_db
from ..roles.models import Role
from ..roles.services import get_role
from ..usuarios.models import Usuario
from .services import decode_token, get_user_from_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Usuario:
    try:
        user = get_user_from_token(db, token)
        return user
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


def get_rol_by_name(db: Session, role_name: str) -> Optional[int]:
    role = db.query(Role).filter(Role.name == role_name).first()
    if role:
        return role.id
    return None


def get_permisos_de_rol(db: Session, role_id: int) -> List[str]:
    role = get_role(db, role_id)
    return [permiso.identificador for permiso in role.permisos] if role else []


def get_permisos_de_roles(db: Session, roles: List[Role]) -> List[str]:
    permisos = set()
    for role in roles:
        if role.id is not None:
            permisos_roles = get_permisos_de_rol(db, role.id)
            permisos.update(permisos_roles)
    return list(permisos)


def permiso_requerido(required_permission: str):
    def dependencia(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
        payload = decode_token(token)
        role_names = payload.get("roles", [])

        for role_name in role_names:
            role_id = get_rol_by_name(db, role_name)
            if role_id is not None:
                permisos = get_permisos_de_rol(db, role_id)
                if required_permission in permisos:
                    return
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos suficientes para acceder a este recurso",
        )

    return dependencia
