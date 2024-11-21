from sqlalchemy.orm import Session
from fastapi import HTTPException
from .schemas import PushEndpointReceive
from ..usuarios.schemas import Usuario
from .models import Alerta, PushEndpoint, Suscripcion
from sqlalchemy.exc import IntegrityError

def suscribir_usuario_a_alerta(db: Session, subscription: PushEndpointReceive, current_user: Usuario):
    
    push_endpoint = PushEndpoint(
        endpoint = subscription.endpoint,
        expiration_time = subscription.expirationTime,
        keys_auth = subscription.keys["auth"],
        keys_p256dh = subscription.keys["p256dh"]
    )
    try:
        push_endpoint.save(db)
    except IntegrityError as e:
        print("Endpoint ya está registrado:", e)
        db.rollback()
        raise HTTPException(status_code=400, detail="El endpoint ya está registrado.")
    except Exception as e:
        print("Otro error ocurrió:", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado.")