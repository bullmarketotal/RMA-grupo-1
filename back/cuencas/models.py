from __future__ import annotations  

from typing import List
from sqlalchemy import Float, Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from back.models import ModeloBase

class Cuenca(ModeloBase):
    __tablename__ = "cuencas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    descripcion: Mapped[str] = mapped_column(String, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, index=True, nullable=True, default=True)

    #Relacion con Nodos (Lazy import)
    nodos: Mapped[List["Nodo"]] = relationship("Nodo", back_populates="cuenca", cascade="all, delete-orphan")
