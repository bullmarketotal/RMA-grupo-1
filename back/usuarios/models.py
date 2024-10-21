from datetime import UTC, datetime, timezone

from passlib.context import CryptContext
from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, Session, mapped_column

from back.models import ModeloBase
from back.usuarios.schemas import UsuarioBase


class Usuario(ModeloBase):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str] = mapped_column(String, index=True)
    date: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )
