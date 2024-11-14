from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .services import get_user_from_token
from ..database import get_db
from ..usuarios.models import Usuario
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Usuario:
    try:
        user = get_user_from_token(db, token)
        return user
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
