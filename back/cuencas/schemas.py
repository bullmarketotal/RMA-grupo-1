from typing import List, Optional
from pydantic import BaseModel
from ..nodos.schemas import Nodo as NodoSchema


class CuencaBase(BaseModel):
    nombre: str
    latitud: Optional[float]
    longitud: Optional[float]
    descripcion: Optional[str] = None


class CuencaCreate(CuencaBase):
    pass


class CuencaUpdate(CuencaBase):
    pass


class Cuenca(CuencaBase):
    id: int
    nodos: List[NodoSchema] = []  # rela con nodos
    latitud: Optional[float]
    longitud: Optional[float]

    model_config = {"from_attributes": True}

class DeleteResponseSchema(BaseModel):
    detail: str
    model_config = {"from_attributes": True}
