from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, field_validator


##ESQUEMAS DE Paquetes
class PaqueteBase(BaseModel):
    sensor_id: int


## ESQUEMAS DE PAQUETES


# Necesitaba un schema donde no se incluya el ID del sensor. Es medio raro pero no quería modificar el PaqueteBase. -gonzalo
class PaqueteSend(BaseModel):
    temperatura: float
    nivel_hidrometrico: float
    date: datetime


class PaqueteBase(PaqueteSend):
    sensor_id: int


class PaqueteCreate(PaqueteBase):
    pass


class PaqueteUpdate(PaqueteBase):
    pass


class Paquete(PaqueteBase):
    id: int

    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}

class PaqueteRechazado(BaseModel):
    # TODO: Cuando refactoricemos Paquete, esto puede usar una jerarquia
    nodo_id: int
    date: datetime
    data: float
    type: int
    motivo: str