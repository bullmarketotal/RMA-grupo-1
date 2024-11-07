from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from back.models import ModeloBase

# from back.sensores.models import Sensor


class Paquete(ModeloBase):
    __tablename__ = "paquetes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sensor_id: Mapped[int] = mapped_column(ForeignKey("sensores.id"))
    temperatura: Mapped[float] = mapped_column(Float, index=True)
    nivel_hidrometrico: Mapped[Optional[float]] = mapped_column(
        Float, index=True, nullable=True
    )
    date: Mapped[datetime] = mapped_column(DateTime, index=True)

    # Relación con Sensor
    sensor = relationship("Sensor", back_populates="paquetes")
    # sensor: Mapped[Sensor] = relationship("Sensor", back_populates="paquetes")

class PaqueteRechazado(ModeloBase):
    __tablename__ = "paquetes_rechazados"
    
    nodo_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    date: Mapped[datetime] = mapped_column(DateTime, primary_key=True, index=True)
    data: Mapped[float] = mapped_column(Integer)
    type: Mapped[int] = mapped_column(Integer, index=True)
    motivo: Mapped[str] = mapped_column(String, index=True)