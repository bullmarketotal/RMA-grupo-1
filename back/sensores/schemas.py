from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
from back.paquete.schemas import Paquete


class SensorBase(BaseModel):
    identificador: str
    porcentajeBateria: int
    latitud: Optional[float]  # Cambiado a float
    longitud: Optional[float]  # Cambiado a float


class SensorCreate(SensorBase):
    pass


class SensorUpdate(SensorBase):
    pass


class Sensor(SensorBase):
    id: int
    latitud: Optional[float]  # Cambiado a float
    longitud: Optional[float]  # Cambiado a float

    model_config = {"from_attributes": True}
