from typing import List, Optional
from pydantic import BaseModel


class NodoBase(BaseModel):
    identificador: str
    porcentajeBateria: int
    latitud: Optional[float]
    longitud: Optional[float]
    descripcion: Optional[str]


class NodoCreate(NodoBase):
    pass


class NodoUpdate(NodoBase):
    pass


class Nodo(NodoBase):
    id: int
    latitud: Optional[float]
    longitud: Optional[float]
    model_config = {"from_attributes": True}
