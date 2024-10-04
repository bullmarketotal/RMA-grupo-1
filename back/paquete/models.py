from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from enum import auto, StrEnum
from datetime import datetime, UTC
from back.models import ModeloBase
from typing import Optional, List


class Paquete(ModeloBase):
    __tablename__ = "paquetes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sensor_id: Mapped[int] = mapped_column(ForeignKey("sensores.id"))
    temperatura: Mapped[float] = mapped_column(Float, index=True)
    nivel_hidrometrico: Mapped[Optional[float]] = mapped_column(
        Float, index=True, nullable=True
    )
    date: Mapped[datetime] = mapped_column(DateTime, index=True)
