from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..auth.dependencies import get_current_user
from . import services
from .schemas import (
    Alerta,
    AlertaCreate,
    AlertaUpdate,
    AlertaUsuario,
    PushEndpointReceive,
    SubscribeUser,
    PushEndpointResponse
)
from typing import List
from ..usuarios.schemas import Usuario

from ..database import get_db

router = APIRouter()



# Endpoint para recibir la suscripción y almacenarla
@router.post('/subscribe', response_model = PushEndpointResponse, tags=["Alertas"])
async def subscribe_user(
    body: SubscribeUser,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
    ):
    print("ID ALERTA:", body.alerta_id)
    push_endpoint_id = services.agregar_endpoint(db, body.subscription)
    print("ID ENDPOINT:", push_endpoint_id)
    #services.vincular_alerta(db, push_endpoint_id, body.alerta_id, current_user.id)

    return {"message": "Suscripción exitosa", "username": current_user.username}

@router.post('/test-notification', tags=["Alertas"])
def send_push_notification(message: str, db: Session = Depends(get_db)):

    notification_data = {
        "title": "Notificación de prueba",  # Título de la notificación
        "body": message  # Mensaje que se enviará como cuerpo
    }

    # Aquí recuperas las suscripciones almacenadas (por ejemplo, desde la base de datos)
    endpoints = services.obtener_suscriptores_de_alerta(db)
    # Iterar sobre todas las suscripciones y enviar la notificación
    services.notificar_a_endpoints(endpoints, notification_data)
    
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

""" 
@router.delete('/alertas/{alerta_id}', response_model=Alerta, tags=["Alertas"])
def delete_alerta(alerta_id: int, db: Session = Depends(get_db)):
    return services.delete_alerta(db, alerta_id) """