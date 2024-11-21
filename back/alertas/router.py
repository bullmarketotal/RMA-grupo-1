from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from pywebpush import webpush, WebPushException
from ..auth.dependencies import get_current_user
from .services import agregar_endpoint
from .schemas import (
    AlertaBase,
    AlertaCreate,
    AlertaUpdate,
    AlertaUsuario,
    PushEndpointReceive,
    PushEndpointResponse
)

from ..usuarios.schemas import Usuario

from ..database import get_db

router = APIRouter()

# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = PushEndpointResponse)
def subscribe_user(
    subscription: PushEndpointReceive,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):

    agregar_endpoint(db, subscription)
    return {"message": "Suscripción exitosa", "username": current_user.username}




