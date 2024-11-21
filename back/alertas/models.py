from sqlalchemy import Boolean, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..models import ModeloBase

class Alerta(ModeloBase):
    __tablename__ = "alertas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(50))
    titulo_notificacion: Mapped[str] = mapped_column(String(50))

class PushEndpoint(ModeloBase):
    __tablename__ = "push_endpoint"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    endpoint: Mapped[str] = mapped_column(String(250), unique=True)
    expiration_time: Mapped[int | None] = mapped_column(Integer, nullable=True, default=None)
    keys_auth: Mapped[str] = mapped_column(String(50)) # TODO: Encriptar?
    keys_p256dh: Mapped[str] = mapped_column(String(50)) # TODO: Encriptar?

# Relaciona a usuarios con sus endpoints (navegadores, dispositivos)
class Suscripcion(ModeloBase):
    __tablename__ = 'suscripcion'

    alerta_id: Mapped[int] = mapped_column(Integer, ForeignKey('alertas.id'), primary_key=True)
    push_endpoint_id: Mapped[int] = mapped_column(Integer, ForeignKey('push_endpoint.id'), primary_key=True)
    usuario_id: Mapped[int] = mapped_column(Integer, ForeignKey('usuarios.id'))