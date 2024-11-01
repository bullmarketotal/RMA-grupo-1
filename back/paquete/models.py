from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Integer
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
