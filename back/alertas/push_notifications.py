from sqlalchemy.orm import Session
from .services import get_alerta
from datetime import datetime, timedelta
from .models import PushEndpoint, Notificacion, Suscripcion, UsuarioNotificacion
from .schemas import AlertaCreate, NotificationData
import json
import os
from pywebpush import webpush, WebPushException


VAPID_PUBLIC_KEY = os.getenv("PUBLIC_KEY")
VAPID_PRIVATE_KEY = os.getenv("PRIVATE_KEY")
VAPID_EMAIL = "mailto:gonzalo.ag88@gmail.com"

class NotificationHandler:
    # Patron singleton
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(NotificationHandler, cls).__new__(cls)
        return cls.instance
    

    def __init__(self):
        self.last_sent = {
        1: None,  # amarillo
        2: None,  # naranja
        3: None,  # rojo
        4: None,  # dato invalido
        5: None,  # bateria baja
    }

    def get_last_notification_time(self):
        alerts = [self.last_yellow, self.last_orange, self.last_red, self.last_validation_error, self.last_low_battery]
        return max(filter(None, alerts), default=None)
    
    def trigger_notification(self, db: Session, message: str, alerta_id: int):

        notification_data = self.get_notification_body(db, alerta_id, message)
        endpoints = self.obtener_suscriptores_de_alerta(db, alerta_id=alerta_id)
        self.almacenar_notificacion(db, endpoints, alerta_id, notification_data)

        ten_minutes_ago = datetime.now() - timedelta(minutes=10)
        # Enviar push solo si el mismo tipo de alerta no se salio en los ultimos 10 minutos
        if self.last_sent[alerta_id] is None or self.last_sent[alerta_id] < ten_minutes_ago:
            print("Enviando notificacion push de alerta de tipo ", alerta_id)
            self.notificar_a_endpoints(db, endpoints, notification_data)
            self.last_sent[alerta_id] = datetime.now()

    def get_notification_body(self, db: Session, alerta_id: int, message: str) -> AlertaCreate:
        alerta = get_alerta(db, alerta_id)

        return {
            "title": alerta.titulo_notificacion, 
            "body": message
        }

    def obtener_suscriptores_de_alerta(self, db: Session, alerta_id: int):
        query = db.query(PushEndpoint).join(Suscripcion, PushEndpoint.usuario_id == Suscripcion.usuario_id).filter(Suscripcion.alerta_id == alerta_id)
        result = query.all()
        return result
    
    def notificar_a_endpoints(self, db: Session, endpoints, notification_data: NotificationData):
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

    def almacenar_notificacion(self, db: Session, endpoints: list[PushEndpoint], alerta_id: int, notification_data):
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