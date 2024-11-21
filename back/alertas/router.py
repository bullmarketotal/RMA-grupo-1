from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pywebpush import webpush, WebPushException
from ..auth.dependencies import get_current_user
from .services import suscribir_usuario_a_alerta
from .schemas import (
    AlertaBase,
    AlertaCreate,
    AlertaUpdate,
    AlertaUsuario,
    PushEndpointReceive
)

from ..usuarios.schemas import Usuario

from ..database import get_db

router = APIRouter()

# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = AlertaCreate)
def subscribe_user(
    subscription: PushEndpointReceive,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):

    try:
        suscribir_usuario_a_alerta(db, subscription, current_user.id)
        return {"nombre": "test", "titulo_notificacion": "titulo"}
        #services.suscribir_usuario_a_alerta(db, subscription, current_user)
        return {"message": "Suscripción exitosa"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))