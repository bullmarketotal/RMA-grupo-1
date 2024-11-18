from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class PaqueteBase(BaseModel):
    nodo_id: int
    data: float
    date: datetime
    type_id: int

    model_config = {"from_attributes": True}


class Paquete(PaqueteBase):
    id: int


class PaqueteCreate(PaqueteBase):
    pass

class PaginationInfo(BaseModel):
    total_items: int
    total_pages: int
    current_page: int
    limit: int
    offset: int


class PaqueteResponse(BaseModel):
    info: PaginationInfo
    items: List[Paquete]


class PaqueteRechazado(PaqueteBase):
    id: int
    motivo: str
