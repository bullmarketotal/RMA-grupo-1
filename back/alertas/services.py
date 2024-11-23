from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from datetime import datetime

from back.database import get_db
from .schemas import PushEndpointReceive, AlertaCreate, NotificationData
from ..usuarios.schemas import Usuario
from .models import Alerta, PushEndpoint, Suscripcion, Notificacion, UsuarioNotificacion
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
    query = db.query(PushEndpoint).join(Suscripcion, PushEndpoint.usuario_id == Suscripcion.usuario_id).filter(Suscripcion.alerta_id == alerta_id)
    result = query.all()
    return result

def notificar_a_endpoints(db: Session, endpoints, notification_data: NotificationData):
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
                    "aud": ""
                }
            )
        except WebPushException as ex:
            print(f"Error enviando notificación: {str(ex)}")

def almacenar_notificacion(db: Session, endpoints: list[PushEndpoint], alerta_id: int, notification_data):
    notificacion = Notificacion(
        alerta_id = alerta_id,
        fecha_hora = datetime.now(),
        message = notification_data["body"],
        titulo = notification_data["title"]
    )

    notificacion.save(db)

    for endpoint in endpoints:
        usua_noti = UsuarioNotificacion(
            notificacion_id = notificacion.id,
            usuario_id = endpoint.usuario_id
        )
        usua_noti.save(db)


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
        "title": alerta.titulo_notificacion, 
        "body": message
    }

def trigger_notification( db: Session, message: str, alerta_id: int):
    notification_data = get_notification_body(db, alerta_id, message)
    endpoints = obtener_suscriptores_de_alerta(db, alerta_id=alerta_id)
    notificar_a_endpoints(db, endpoints, notification_data)
    almacenar_notificacion(db, endpoints, alerta_id, notification_data)
    

def unsubscribe(db: Session, usuario_id: int, alerta_id: int):
    sub = db.query(Suscripcion).filter(Suscripcion.usuario_id == usuario_id, Suscripcion.alerta_id == alerta_id).first()
    if not sub:
        return {"message": "No existe la suscripción provista"}
    try:
        sub.delete(db)
        # Si al usuario no le queda suscripta ninguna alerta, se elimina su push endpoint
        alertas_restantes_de_usuario = db.query(Suscripcion).filter(Suscripcion.usuario_id == usuario_id).first()
        if not alertas_restantes_de_usuario:
            db.query(PushEndpoint).filter(PushEndpoint.usuario_id == usuario_id).delete()
        db.commit()
        return {"message": "Suscripción eliminada", "status_code": 200}
    except Exception as e:
        db.rollback()
        print("Error al desuscribir usuario: ", e)
        return {"message": "Ocurrió un error inesperado"}