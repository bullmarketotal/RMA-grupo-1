from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from back.roles.services import user_has_permission

from ..database import get_db
from ..usuarios.models import Usuario
from .services import get_user_from_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Usuario:
    try:
        user = get_user_from_token(db, token)
        return user
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


def permiso_requerido(permiso: str):
    def dependencia(usuario=Depends(get_current_user), db: Session = Depends(get_db)):
        print(f"Permiso encontrado: {permiso, usuario}")
        if not user_has_permission(usuario.id, permiso, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos suficientes para acceder a este recurso",
            )

    return dependencia
