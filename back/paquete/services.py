from typing import List
from sqlalchemy.orm import Session
from back.paquete.models import Paquete
from back import exceptions
from back.paquete import schemas
from typing import Optional
from datetime import datetime
from sqlalchemy import func


def crear_paquete(db: Session, paquete: schemas.PaqueteCreate) -> Paquete:
    return Paquete.create(db, paquete)


def listar_paquetes(db: Session, limit: int, offset: int, sensor_id: Optional[int] = None, date: Optional[datetime] = None):

    query = db.query(Paquete)

    # Filtro por sensor_id (nodo) si se proporciona
    if sensor_id:
        query = query.filter(Paquete.sensor_id == sensor_id)

    # Filtro por date (fecha) si se proporciona
    if date:
        query = query.filter(func.date(Paquete.date) == date.date())

    # Aplica el límite y el offset
    return query.offset(offset).limit(limit).all()
