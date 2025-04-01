from typing import List, Optional
from pydantic import BaseModel, create_model
from ..paquete.schemas import Paquete as PaqueteSchema

# Aquí definimos Cuenca como un modelo que se resolverá dinámicamente
CuencaSchema = create_model("CuencaSchema", __base__=BaseModel)

class NodoBase(BaseModel):
    identificador: str
    porcentajeBateria: int
    latitud: Optional[float]
    longitud: Optional[float]
    descripcion: Optional[str] 

class NodoCreate(NodoBase):
    cuenca_id: int

class NodoUpdate(NodoBase):
    cuenca_id: Optional[int]  #Permite actualizar la cuenca

class Nodo(NodoBase):
    id: int
    latitud: Optional[float]
    longitud: Optional[float]
    
    
    cuenca_id: Optional[int]  

    model_config = {"from_attributes": True}

class DeleteResponseSchema(BaseModel):
    detail: str
    model_config = {"from_attributes": True}

class NodoConPaquetes(Nodo):
    paquetes: List[PaqueteSchema]
