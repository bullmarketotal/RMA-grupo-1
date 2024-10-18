from datetime import datetime

from pydantic import BaseModel


##ESQUEMA DE USUARIOS##
class UsuarioBase(BaseModel):
    usuario: str
    password: str  # hashed_password


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioUpdate(UsuarioBase):
    pass


class Usuario(UsuarioBase):
    id: int
    date: datetime
    model_config = {"from_attributes": True}
