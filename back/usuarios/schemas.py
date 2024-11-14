from datetime import datetime
from pydantic import BaseModel
from typing import Optional


##ESQUEMA DE USUARIOS##
class UsuarioBase(BaseModel):
    username: str


class UsuarioOut(UsuarioBase):
    id: int
    is_active: bool
    model_config = {"from_attributes": True}


class UsuarioBase(BaseModel):
    username: str


class UsuarioCreate(BaseModel):
    username: str
    password: str
    model_config = {"from_attributes": True}


class UsuarioUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None


class Usuario(UsuarioBase):
    id: int
    is_active: bool
    date_created: datetime
    model_config = {"from_attributes": True}
