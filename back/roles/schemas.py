from typing import List, Optional

from pydantic import BaseModel, EmailStr, field_validator

from back.paquete.schemas import Paquete, PaqueteSend


class RolBase(BaseModel):
    nombre: str
    permisos: str
