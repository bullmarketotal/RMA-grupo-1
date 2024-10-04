from typing import List
from sqlalchemy.orm import Session
from back.paquete.models import Paquete
from back import exceptions
from back.paquete import schemas


def crear_paquete(db: Session, paquete: schemas.PaqueteCreate) -> Paquete:
    return Paquete.create(db, paquete)


def listar_paquetes(db: Session, limit: int, offset: int):
    return db.query(Paquete).offset(offset).limit(limit).all()
