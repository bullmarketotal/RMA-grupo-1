from datetime import datetime

from pydantic import BaseModel, EmailStr, field_validator

from back.usuarios.schemas import Usuario


##ESQUEMA DE USUARIOS##
class UsuarioBase(BaseModel):
    usuario: int
    email: str
    password: str
    date: datetime


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioUpdate(UsuarioBase):
    pass


class Usuario(UsuarioBase):
    id: int
    model_config = {"from_attributes": True}
