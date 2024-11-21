from sqlalchemy.orm import Session
from .schemas import PushEndpointReceive
from ..usuarios.schemas import Usuario
from .models import Alerta, PushEndpoint, Suscripcion

def suscribir_usuario_a_alerta(db: Session, subscription: PushEndpointReceive, current_user: Usuario):
    print("Suscribir usuario! Con push")
    push_endpoint = PushEndpoint(
        endpoint = subscription.endpoint,
        expiration_time = subscription.expirationTime,
        keys_auth = subscription.keys["auth"],
        keys_p256dh = subscription.keys["p256dh"]
    )
    print("PUSHENDPOINT", push_endpoint)
    return push_endpoint.save(db)