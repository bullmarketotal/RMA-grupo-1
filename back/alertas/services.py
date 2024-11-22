from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from .schemas import PushEndpointReceive, AlertaCreate, NotificationData
from ..usuarios.schemas import Usuario
from .models import Alerta, PushEndpoint, Suscripcion
from pywebpush import webpush, WebPushException
import os
import json

VAPID_PUBLIC_KEY = os.getenv("PUBLIC_KEY")
VAPID_PRIVATE_KEY = os.getenv("PRIVATE_KEY")
VAPID_EMAIL = "mailto:gonzalo.ag88@gmail.com"

def agregar_endpoint(db: Session, subscription: PushEndpointReceive, usuario_id: int) -> int:
    
    push_endpoint = PushEndpoint(
        usuario_id = usuario_id,
        endpoint = subscription.endpoint,
        expiration_time = subscription.expirationTime,
        keys_auth = subscription.keys["auth"],
        keys_p256dh = subscription.keys["p256dh"]
    )
    id = None
    try:
        res =  push_endpoint.save(db)
        id = res.id
    except IntegrityError as e:
        print("Endpoint ya está registrado", e)
        db.rollback()
        res = PushEndpoint.filter(db, endpoint = subscription.endpoint)
        id = res[0].id
    except Exception as e:
        print("Otro error ocurrió:", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado.")
    finally:
        return id
    
def vincular_alerta(db: Session, alerta_id: int, user_id: int):
    suscripcion = Suscripcion(alerta_id=alerta_id, usuario_id=user_id)
    print("Vinculando alerta a suscripcion: ", suscripcion)
    try:
        suscripcion.save(db)
    except IntegrityError as e:
        print("Suscripcion ya está registrada:", e)
        db.rollback()
    except Exception as e:
        print("Otro error ocurrió:", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado.")
    

def obtener_suscriptores_de_alerta(db: Session, alerta_id: int):
    # Obtener endpoints de usuarios suscriptos al alerta provisto

    query = db.query(PushEndpoint).join(Suscripcion, PushEndpoint.usuario_id == Suscripcion.usuario_id).filter(Suscripcion.alerta_id == alerta_id)
    result = query.all()
    return result

def notificar_a_endpoints(endpoints, notification_data: NotificationData):
    for endpoint in endpoints:
        try:
            webpush(
                subscription_info={
                    "endpoint": endpoint.endpoint,
                    "keys": {
                        "auth": endpoint.keys_auth,
                        "p256dh": endpoint.keys_p256dh
                    }
                },
                data=json.dumps(notification_data),
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims={
                    "sub": VAPID_EMAIL,
                    "aud": "https://fcm.googleapis.com"
                }
            )
        except WebPushException as ex:
            print(f"Error enviando notificación: {str(ex)}")


def crear_alerta(db: Session, alerta: AlertaCreate):
    return Alerta.create(db, alerta)

def get_all_alertas(db: Session):
    return Alerta.get_all(db)

def get_alerta(db: Session, alerta_id: int):
    alerta = Alerta.get(db, alerta_id)
    if not alerta:
        raise HTTPException(status_code = 404, detail="Alerta no encontrada")
    return alerta

def get_notification_body(db: Session, alerta_id: int, message: str) -> AlertaCreate:
    alerta = get_alerta(db, alerta_id)

    return {
        "title": alerta.titulo_notificacion,  # Título de la notificación
        "body": message  # Mensaje que se enviará como cuerpo
    }