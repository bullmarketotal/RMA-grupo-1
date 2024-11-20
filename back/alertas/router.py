from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pywebpush import webpush, WebPushException
from ..auth.dependencies import get_current_user
from . import services
from .schemas import (
    AlertaBase,
    AlertaCreate,
    AlertaUpdate,
    AlertaUsuario,
    PushSubscription
)

from ..usuarios.schemas import Usuario

from ..database import get_db

router = APIRouter()

# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = AlertaCreate)
def subscribe_user(
    subscription: PushSubscription,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):
    # Aquí guardarías la suscripción en una base de datos
    # para luego usarla para enviar notificaciones
    try:
        services.suscribir_usuario_a_alerta(db, subscription, current_user)
        return {"message": "Suscripción exitosa"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))