from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..auth.dependencies import get_current_user
from .services import agregar_endpoint, vincular_alerta, obtener_suscriptores_de_alerta, notificar_a_endpoints
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
@router.post('/subscribe', response_model = PushEndpointResponse, tags=["Alertas"])
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

@router.post('/test-notification', tags=["Alertas"])
def send_push_notification(message: str, db: Session = Depends(get_db)):

    notification_data = {
        "title": "Notificación de prueba",  # Título de la notificación
        "body": message  # Mensaje que se enviará como cuerpo
    }

    # Aquí recuperas las suscripciones almacenadas (por ejemplo, desde la base de datos)
    endpoints = obtener_suscriptores_de_alerta(db)
    # Iterar sobre todas las suscripciones y enviar la notificación
    notificar_a_endpoints(endpoints, notification_data)
    
    return {"message": "Notificaciones enviadas exitosamente"}



