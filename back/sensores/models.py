from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped, mapped_column, relationship
from back.database import Base
from enum import auto, StrEnum
from datetime import datetime, UTC
from back.models import BaseModel


class Sensor(BaseModel):
    __tablename__ = "sensores" 

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identificador: Mapped[str] = mapped_column(String, index=True)
    porcentajeBateria: Mapped[int] = mapped_column(Integer,index = True)
    ubicacion: Mapped["Ubicacion"] = relationship("Ubicacion", back_populates="sensor")


class Ubicacion(BaseModel):
    __tablename__ = "ubicaciones" 

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    latitud: Mapped[int] = mapped_column(Integer, index=True)
    longitud: Mapped[int] = mapped_column(Integer,index = True)
    sensor_id: Mapped[int] = mapped_column(
        ForeignKey("sensores.id")
    )  # Foreign key a Persona
    sensor: Mapped[Sensor] = relationship("Sensor", back_populates="ubicacion") 
