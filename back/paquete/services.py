from datetime import datetime
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session

from back import exceptions
from back.paquete import schemas
from back.paquete.models import Paquete


def crear_paquete(db: Session, paquete: schemas.PaqueteCreate) -> Paquete:
    return Paquete.create(db, paquete)


def listar_paquetes(
    db: Session,
    limit: int,
    offset: int,
    sensor_id: Optional[int] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
):

    query = db.query(Paquete)

    # Filtro por sensor_id (nodo) si se proporciona
    if sensor_id:
        query = query.filter(Paquete.sensor_id == sensor_id)

    # Filtro por rango de fechas si se proporcionan ambas
    if start_date and end_date:
        query = query.filter(
            func.date(Paquete.date).between(start_date.date(), end_date.date())
        )

    # Filtro por una sola fecha si solo se proporciona una
    elif start_date:
        query = query.filter(func.date(Paquete.date) == start_date.date())

    # Obtener el total de registros
    total = query.count()

    # Aplica el límite y el offset
    return query.offset(offset).limit(limit).all()
