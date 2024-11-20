from sqlalchemy.orm import Session
from .schemas import PushSubscription
from ..usuarios.schemas import Usuario

def suscribir_usuario_a_alerta(db: Session, subscription: PushSubscription, current_user: Usuario):
    print("Suscribir usuario!")
    print(current_user)