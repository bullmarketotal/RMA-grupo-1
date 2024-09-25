
from pydantic import BaseModel, EmailStr, field_validator


##ESQUEMAS DE SENSORES
class SensorBase(BaseModel):
    identificador: str
    ubicicaion: "Ubicacion"


class SensorCreate(SensorBase):
    pass


class SensorUpdate(SensorBase):
    pass



class Sensor(SensorBase):
    id: int
    porcentajeBateria: int
    

    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}



##ESQUEMAS DE UBICACION

class UbicacionBase(BaseModel):
    latitud: int
    longitud: int


class UbicacionCreate(UbicacionBase):
    pass


class UbicacionUpdate(UbicacionBase):
    pass



class Ubicacion(UbicacionBase):
    id: int
    sensor_id: int
    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}