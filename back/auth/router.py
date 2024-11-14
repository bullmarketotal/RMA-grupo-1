from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .schemas import Token, TokenRefresh
from . import services
from ..database import get_db
from ..usuarios.models import Usuario
from back.usuarios.schemas import UsuarioCreate, UsuarioOut


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
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh_token", response_model=Token, tags=["Auth"])
def refresh_access_token_view(
    refresh_token: TokenRefresh, db: Session = Depends(get_db)
):
    new_access_token = services.refresh_access_token(db, refresh_token.refresh_token)
    return {"access_token": new_access_token, "token_type": "bearer"}


@router.post("/refresh_token", response_model=Token, tags=["Auth"])
def refresh_access_token(refresh_token: str, db: Session = Depends(get_db)):
    user_data = services.decode_refresh_token(refresh_token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    # Crear un nuevo access token
    access_token = services.create_access_token(
        data={"id": user_data["id"], "username": user_data["username"]}
    )
    return {"access_token": access_token, "token_type": "bearer"}


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
