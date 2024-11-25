from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from .schemas import PushEndpointReceive, AlertaCreate
from .models import Alerta, PushEndpoint, Suscripcion


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
    



def crear_alerta(db: Session, alerta: AlertaCreate):
    return Alerta.create(db, alerta)

def get_all_alertas(db: Session):
    return Alerta.get_all(db)

def get_alerta(db: Session, alerta_id: int):
    alerta = Alerta.get(db, alerta_id)
    if not alerta:
        raise HTTPException(status_code = 404, detail="Alerta no encontrada")
    return alerta

       
            

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
    
def get_user_subscriptions(db: Session, usuario_id: int) -> list[Alerta]:
    subs = Suscripcion.filter(db, usuario_id = usuario_id)
    response = []

    for sub in subs:
        alerta = Alerta.get(db, sub.alerta_id)
        response.append(alerta)
    return response