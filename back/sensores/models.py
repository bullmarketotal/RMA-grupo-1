from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from enum import auto, StrEnum
from datetime import datetime, UTC
from back.models import BaseModel           
from typing import Optional, List

class Sensor(BaseModel):
    __tablename__ = "sensores" 

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identificador: Mapped[str] = mapped_column(String, index=True)
    porcentajeBateria: Mapped[int] = mapped_column(Integer,index = True)
    latitud: Mapped[int] = mapped_column(Integer,index = True, nullable=True)
    longitud: Mapped[int] = mapped_column(Integer,index = True, nullable=True)


