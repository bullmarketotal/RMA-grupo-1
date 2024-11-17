from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..models import ModeloBase
from ..nodos.models import Nodo


class Paquete(ModeloBase):
    __tablename__ = "paquetes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    data: Mapped[Float] = mapped_column(Float, index=True)
    type: Mapped[int] = mapped_column(ForeignKey("tipos.id"))
    date: Mapped[datetime] = mapped_column(DateTime, index=True)
    # Relación con Sensor
    nodo_id: Mapped[int] = mapped_column(ForeignKey("nodos.id"))
    nodo: Mapped[Nodo] = relationship(Nodo, back_populates="paquetes")


class PaqueteRechazado(ModeloBase):
    __tablename__ = "paquetes_rechazados"

    nodo_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    date: Mapped[datetime] = mapped_column(DateTime, primary_key=True, index=True)
    data: Mapped[float] = mapped_column(Integer)
    type: Mapped[int] = mapped_column(Integer, index=True)
    motivo: Mapped[str] = mapped_column(String, index=True)


class PaqueteArchivo(ModeloBase):
    __tablename__ = "paquetes_archivo"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    data: Mapped[Float] = mapped_column(Float, index=True)
    type: Mapped[int] = mapped_column(ForeignKey("tipos.id"))
    date: Mapped[datetime] = mapped_column(DateTime, index=True)
    nodo_id: Mapped[int] = mapped_column(Integer, index=True)
