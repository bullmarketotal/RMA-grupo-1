from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import get_db
from ..usuarios.models import Usuario
from ..usuarios.schemas import UsuarioCreate, UsuarioOut
from . import services
from .dependencies import oauth2_scheme, get_permisos_de_roles
from .schemas import Token, TokenRefresh, TokenRefreshResponse

router = APIRouter()


@router.post("/login_token", response_model=Token, tags=["Auth"])
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = services.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = services.create_access_token(
        data={
            "id": user.id,
            "username": user.username,
            "roles": [role.name for role in user.roles],
        }
    )
    refresh_token = services.create_refresh_token(
        data={"id": user.id, "username": user.username}
    )
    permisos = get_permisos_de_roles(db, user.roles)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "permisos": permisos,
        "user": user.username,
    }


@router.post("/refresh_token", response_model=TokenRefreshResponse, tags=["Auth"])
def refresh_access_token_view(refresh_token: str, db: Session = Depends(get_db)):
    new_tokens = services.refresh_access_token(db, refresh_token)
    return new_tokens


@router.get("/verify_token", tags=["Auth"])
def verify_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    user = services.get_user_from_token(db, token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token or user not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"message": "Token is valid", "user": user.username}


@router.post("/register", response_model=UsuarioOut, tags=["Auth"])
def register(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(Usuario).filter(Usuario.username == usuario.username).first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    return services.crear_usuario(db, usuario)
