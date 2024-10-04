from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
from back.paquete.schemas import Paquete


##ESQUEMAS DE SENSORES
class SensorBase(BaseModel):
    identificador: str
    porcentajeBateria: int
    latitud: Optional[int]
    longitud: Optional[int]


class SensorCreate(SensorBase):
    pass


class SensorUpdate(SensorBase):
    pass


class Sensor(SensorBase):
    id: int
    latitud: Optional[int]
    longitud: Optional[int]

    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}
