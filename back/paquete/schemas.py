from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


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
    motivo: str


class TipoBase(BaseModel):
    data_type: int
    data_symbol: str
    nombre: str


class TipoCreate(TipoBase):
    pass


class TipoUpdate(TipoBase):
    data_type: Optional[int] = None
    data_symbol: Optional[str] = None
    nombre: Optional[str] = None


class TipoSchema(TipoBase):
    id: int
    model_config = {"from_attributes": True}
