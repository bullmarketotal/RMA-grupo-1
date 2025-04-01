from __future__ import annotations  

from typing import List
from sqlalchemy import Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from back.models import ModeloBase

class Cuenca(ModeloBase):
    __tablename__ = "cuencas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    descripcion: Mapped[str] = mapped_column(String, index=True)
    latitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)
    longitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)

    #Relacion con Nodos (Lazy import)
    nodos: Mapped[List["Nodo"]] = relationship("Nodo", back_populates="cuenca", cascade="all, delete-orphan")
