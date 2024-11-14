from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..models import ModeloBase
from ..usuarios.models import Usuario


class Role(ModeloBase):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    description: Mapped[str] = mapped_column(String)

    usuarios: Mapped[list["Usuario"]] = relationship(
        "Usuario", secondary="usuario_roles", back_populates="roles"
    )
    permisos: Mapped[list["Permiso"]] = relationship(
        "Permiso", secondary="role_permisos", back_populates="roles"
    )


class UsuarioRole(ModeloBase):
    __tablename__ = "usuario_roles"

    usuario_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), primary_key=True
    )
    role_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True
    )
