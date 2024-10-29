from datetime import UTC, datetime
from enum import StrEnum, auto
from typing import List, Optional

from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from back.models import ModeloBase


class Rol(ModeloBase):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String, index=True)
    permisos: Mapped[str] = mapped_column(String, index=True)
