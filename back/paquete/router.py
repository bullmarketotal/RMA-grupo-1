from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from back.database import get_db
from back.paquete import models, schemas, services

router = APIRouter()

# Rutas para Paquetees


# @router.get("/paquetes", response_model=list[schemas.Paquete])
# def read_Paquetes(db: Session = Depends(get_db)):
#     return services.listar_Paquetes(db)


@router.get("/paquetes", response_model=list[schemas.Paquete])
def read_paquetes(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    sensor_id: Optional[int] = Query(None),  # Filtro opcional por sensor_id (nodo)
    date: Optional[datetime] = Query(None),  # Filtro opcional por date (fecha)
    db: Session = Depends(get_db),
):
    return services.listar_paquetes(db, limit=limit, offset=offset,sensor_id=sensor_id, date=date)

