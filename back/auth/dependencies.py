from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ..database import get_db
from ..usuarios.models import Usuario
from .services import get_user_from_token, decode_token
from ..roles.services import get_role
from typing import List

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Usuario:
    try:
        user = get_user_from_token(db, token)
        return user
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


def get_permisos_de_rol(db: Session, role_id: int) -> List[str]:
    role = get_role(db, role_id)
    return [permiso.identificador for permiso in role.permisos] if role else []


def permiso_requerido(required_permission: str):
    def dependencia(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
        payload = decode_token(token)
        role_ids = payload.get("roles", [])
        for role_id in role_ids:
            permisos = get_permisos_de_rol(db, role_id)
            if required_permission in permisos:
                return
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos suficientes para acceder a este recurso",
        )

    return dependencia
