from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, field_validator


##ESQUEMAS DE Paquetes
class PaqueteBase(BaseModel):
    sensor_id: int
    temperatura: float
    nivel_hidrometrico: Optional[float]
    date: datetime


class PaqueteCreate(PaqueteBase):
    pass


class PaqueteUpdate(PaqueteBase):
    pass


class Paquete(PaqueteBase):
    id: int

    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}
