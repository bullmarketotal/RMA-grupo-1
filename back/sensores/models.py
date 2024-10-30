from datetime import UTC, datetime
from enum import StrEnum, auto
from typing import List, Optional

from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from back.models import ModeloBase
from back.paquete.models import Paquete


class Sensor(ModeloBase):
    __tablename__ = "sensores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identificador: Mapped[str] = mapped_column(String, unique=True, index=True)
    porcentajeBateria: Mapped[int] = mapped_column(Integer, index=True)
    latitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)
    longitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)
