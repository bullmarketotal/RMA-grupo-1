from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from back.database import get_db
from back.paquete import schemas, services

router = APIRouter()

# Rutas para Paquetees


# @router.get("/paquetes", response_model=list[schemas.Paquete])
# def read_Paquetes(db: Session = Depends(get_db)):
#     return services.listar_Paquetes(db)


@router.get("/paquetes", response_model=list[schemas.Paquete])
def read_paquetes(
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    sensor_id: Optional[int] = None,  ## filtrar por id de sensor
    start_date: Optional[datetime] = None,  ## filtrar por fechas
    end_date: Optional[datetime] = None,  ## rt
    db: Session = Depends(get_db),
):
    return services.listar_paquetes(
        db,
        limit=limit,
        offset=offset,
        sensor_id=sensor_id,
        start_date=start_date,
        end_date=end_date,
    )
