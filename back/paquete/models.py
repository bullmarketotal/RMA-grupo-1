from datetime import UTC, datetime
from enum import StrEnum, auto
from typing import List, Optional

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from back.models import ModeloBase


class Paquete(ModeloBase):
    __tablename__ = "paquetes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sensor_id: Mapped[int] = mapped_column(ForeignKey("sensores.id"))
    temperatura: Mapped[float] = mapped_column(Float, index=True)
    nivel_hidrometrico: Mapped[Optional[float]] = mapped_column(
        Float, index=True, nullable=True
    )
    date: Mapped[datetime] = mapped_column(DateTime, index=True)
