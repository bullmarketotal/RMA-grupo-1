from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from pywebpush import webpush, WebPushException
from ..auth.dependencies import get_current_user
from .services import agregar_endpoint, vincular_alerta
from .schemas import (
    AlertaBase,
    AlertaCreate,
    AlertaUpdate,
    AlertaUsuario,
    PushEndpointReceive,
    SubscribeUser,
    PushEndpointResponse
)

from ..usuarios.schemas import Usuario

from ..database import get_db

router = APIRouter()

# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = PushEndpointResponse)
async def subscribe_user(
    body: SubscribeUser,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):
    print("ID ALERTA:", body.alerta_id)
    push_endpoint_id = agregar_endpoint(db, body.subscription)
    print("ID ENDPOINT:", push_endpoint_id)
    #vincular_alerta(db, push_endpoint_id, body.alerta_id, current_user.id)

    return {"message": "Suscripción exitosa", "username": current_user.username}




