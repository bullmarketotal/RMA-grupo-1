from datetime import datetime, UTC
from passlib.context import CryptContext
from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, Session, mapped_column, relationship

from back.models import ModeloBase
from back.usuarios.schemas import UsuarioBase

from datetime import datetime
from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from back.models import ModeloBase
from back.usuarios.schemas import UsuarioBase


class Usuario(ModeloBase):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    usuario: Mapped[str] = mapped_column(String, index=True)
    password: Mapped[str] = mapped_column(String, index=True)
    date: Mapped[datetime] = mapped_column(DateTime, index=True)

    @classmethod
    def create(cls, db: Session, schema: UsuarioBase):
        # Hasheo la contraseña
        # hashed_password = pwd_context.hash(schema.password)
        # print(f"Usuario creado: username - {schema.usuario}, password (hashed) - {schema.password}")
        instance = cls(
            usuario=schema.usuario, password=schema.password, date=datetime.now(UTC)
        )
        return instance.save(db)
