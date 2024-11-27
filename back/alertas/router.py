from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from ..auth.dependencies import get_current_user
from . import services
from .schemas import (
    Alerta,
    AlertaCreate,
    SubscribeUser,
    PushEndpointResponse,
    Notificacion
)
from typing import List, Optional
from ..usuarios.schemas import Usuario
from .push_notifications import NotificationHandler
from ..database import get_db

router = APIRouter()

notificaciones = NotificationHandler()

@router.get('/subscriptions', response_model = list[Alerta], tags=["Alertas"])
def get_user_subscriptions(db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return services.get_user_subscriptions(usuario_id = current_user.id, db = db)

# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = PushEndpointResponse, tags=["Alertas"])
async def subscribe_user(
    body: SubscribeUser,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):
    push_endpoint_id = services.agregar_endpoint(db, body.subscription, current_user.id)
    services.vincular_alerta(db, body.alerta_id, current_user.id)

    return {"message": "Suscripción exitosa", "username": current_user.username}

@router.delete('/unsubscribe', tags=["Alertas"])
def unsubscribe_user(alerta_id: int, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return services.unsubscribe(db, current_user.id, alerta_id)

@router.post('/test-notification', tags=["Alertas"])
def send_push_notification(message: str, alerta_id: int, db: Session = Depends(get_db)):
    notificaciones.trigger_notification(db=db, message=message, alerta_id=alerta_id, nodo_id=1)
    return {"message": "Notificaciones enviadas exitosamente"}


#CRUD Alerta

@router.get('/alertas/{alerta_id}', response_model=Alerta, tags=["Alertas"])
def get_alertas(alerta_id: int, db: Session = Depends(get_db)):
    return services.get_alerta(db, alerta_id)

@router.get('/alertas', response_model=List[Alerta], tags=["Alertas"])
def get_all_alertas(db: Session = Depends(get_db)):
    return services.get_all_alertas(db)


@router.post('/alertas', tags=["Alertas"])
def post_alerta(alerta: AlertaCreate, db: Session = Depends(get_db)):
    return services.crear_alerta(db, alerta)

@router.get('/usernotifications', response_model=List[Notificacion], tags=["Alertas"])
def get_user_notifications(count_limit: int, not_read_only: Optional[bool] = False, start_date_limit: Optional[datetime] = None, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)): 
    return services.get_user_notifications(not_read_only, count_limit, start_date_limit, db, current_user.id) 

""" 
@router.delete('/alertas/{alerta_id}', response_model=Alerta, tags=["Alertas"])
def delete_alerta(alerta_id: int, db: Session = Depends(get_db)):
    return services.delete_alerta(db, alerta_id) """