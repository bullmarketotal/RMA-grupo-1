from sqlalchemy import Boolean, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..models import ModeloBase

# Tabla intermedia para la relación muchos-a-muchos entre usuarios y alertas
user_alert_table = Table(
    'usuario_alerta',
    Base.metadata,
    Column('usuario_id', Integer, ForeignKey('usuarios.id'), primary_key=True),
    Column('alerta_id', Integer, ForeignKey('alertas.id'), primary_key=True)
)

class Alerta(ModeloBase):
    __tablename__ = "alertas"

    id: Mapped[int] = mapped_column(Integer, primary_key=true, index=true)
    nombre: Mapped[str] = mapped_column(String(50))
    titulo_notificacion: Mapped[str] = mapped_column(String(50))
    users = relationship("Usuario", secondary = user_alert_table, back_populates = "usuarios")
