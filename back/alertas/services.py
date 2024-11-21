from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from .schemas import PushEndpointReceive
from ..usuarios.schemas import Usuario
from .models import Alerta, PushEndpoint, Suscripcion


def agregar_endpoint(db: Session, subscription: PushEndpointReceive):
    
    push_endpoint = PushEndpoint(
        endpoint = subscription.endpoint,
        expiration_time = subscription.expirationTime,
        keys_auth = subscription.keys["auth"],
        keys_p256dh = subscription.keys["p256dh"]
    )
    try:
        push_endpoint.save(db) # TODO obtener y retornar el ID
    except IntegrityError as e:
        print("Endpoint ya está registrado:", e)
        db.rollback()
    except Exception as e:
        print("Otro error ocurrió:", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado.")
    
def vincular_alerta(db: Session, endpoint_id: int, alerta_id: int, user_id: int):
    suscripcion = Suscripcion(endpoint_id = endpoint_id, alerta_id=alerta_id, user_id=user_id)
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