from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AlertaBase(BaseModel):
    nombre: str
    titulo_notificacion: str

class AlertaCreate(AlertaBase):
    pass

class AlertaUpdate:
    id: int

class AlertaUsuario(BaseModel):
    alarma_id: int
    usuario_id: int

class Alerta(AlertaBase):
    id: int

# Schema para recibir la suscripción desde el frontend
class PushEndpointReceive(BaseModel):
    endpoint: str
    expirationTime: Optional[int] = None
    keys: dict

class SubscribeUser(BaseModel):
    subscription: PushEndpointReceive
    alerta_id: int

class PushEndpointResponse(BaseModel):
    message: str
    username: Optional[str] = None

class NotificationData(BaseModel):
    message: str
    body: str

class Notificacion(BaseModel):
    id: int
    alerta_id: int
    nodo_id: int
    fecha_hora: datetime
    titulo: str
    message: str
    is_read: bool
