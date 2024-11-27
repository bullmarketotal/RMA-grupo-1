from sqlalchemy import Boolean, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from ..models import ModeloBase

class Alerta(ModeloBase):
    __tablename__ = "alertas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(50), unique=True)
    titulo_notificacion: Mapped[str] = mapped_column(String(50))

class PushEndpoint(ModeloBase):
    __tablename__ = "push_endpoint"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    usuario_id: Mapped[int] = mapped_column(Integer, ForeignKey("usuarios.id"))
    endpoint: Mapped[str] = mapped_column(String(250), unique=True)
    expiration_time: Mapped[int | None] = mapped_column(Integer, nullable=True, default=None)
    keys_auth: Mapped[str] = mapped_column(String(50)) # TODO: Encriptar?
    keys_p256dh: Mapped[str] = mapped_column(String(50)) # TODO: Encriptar?

# Relaciona a usuarios con sus endpoints (navegadores, dispositivos) y un alerta
class Suscripcion(ModeloBase):
    __tablename__ = 'suscripcion'

    alerta_id: Mapped[int] = mapped_column(Integer, ForeignKey('alertas.id'), primary_key=True)
    usuario_id: Mapped[int] = mapped_column(Integer, ForeignKey('usuarios.id'), primary_key=True)

class Notificacion(ModeloBase):
    __tablename__ = 'notificaciones_historial'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    alerta_id: Mapped[int] = mapped_column(Integer, ForeignKey('alertas.id'), index=True)
    nodo_id: Mapped[int] = mapped_column(Integer, ForeignKey('nodos.id'), index=True)
    fecha_hora: Mapped[datetime] = mapped_column(DateTime)
    titulo: Mapped[str] = mapped_column(String)
    message: Mapped[str] = mapped_column(String)
    usuario_notificaciones: Mapped[list["UsuarioNotificacion"]] = relationship(
        "UsuarioNotificacion", back_populates="notificacion"
    )

class UsuarioNotificacion(ModeloBase):
    __tablename__ = "usuario_notificacion"

    notificacion_id: Mapped[int] = mapped_column(Integer, ForeignKey('notificaciones_historial.id'), index=True, primary_key=True)
    usuario_id: Mapped[int] = mapped_column(Integer, ForeignKey('usuarios.id'), index=True, primary_key=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    notificacion: Mapped[Notificacion] = relationship(
        "Notificacion", back_populates="usuario_notificaciones"
    )

