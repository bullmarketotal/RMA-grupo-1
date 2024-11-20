from sqlalchemy import Boolean, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..models import ModeloBase


class Alerta(ModeloBase):
    __tablename__ = "alertas"

    id: Mapped[int] = mapped_column(Integer, primary_key=true, index=true)
    nombre: Mapped[str] = mapped_column(String(50))
    titulo_notificacion: Mapped[str] = mapped_column(String(50))

class AlertaUsuario(ModeloBase):
    __tablename__ = "alerta_usuario"

    usuario_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("usuarios.id", ondelete="CASCADE", primary_key=True)
    )

    alerta_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("alertas.id", ondelete="CASCADE", primary_key=True)
    )
    