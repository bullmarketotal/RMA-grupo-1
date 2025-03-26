from datetime import datetime, timedelta
from typing import List

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy import select, delete
from ..nodos import schemas
from ..paquete.models import Paquete, PaqueteArchivo
from .models import Nodo
from .schemas import Nodo as NodoSchema
from .schemas import NodoUpdate


def crear_nodo(db: Session, nodo: schemas.NodoCreate) -> Nodo:
    return Nodo.create(db, nodo)


def listar_nodos(db: Session) -> List[Nodo]:
    return Nodo.filter(db, is_active=True)


def listar_nodos_inactivos(db: Session) -> List[Nodo]:
    return Nodo.filter(db, is_active=False)


def get_nodo(db: Session, nodo_id: int) -> NodoSchema:
    nodo = Nodo.get(db, nodo_id)

    if not nodo:
        raise HTTPException(status_code=404, detail="Nodo no encontrado")

    if not nodo.is_active:
        raise HTTPException(status_code=400, detail="Nodo inactivo")

    return NodoSchema.model_validate(nodo)

def get_nodos_por_cuenca(db: Session, cuenca_id: int):
    return db.query(Nodo).filter(Nodo.cuenca_id == cuenca_id).all()



def modificar_nodo(db: Session, nodo_id: int, nodo_actualizado: NodoUpdate) -> Nodo:
    nodo = Nodo.get(db, nodo_id)
    if not nodo:
        raise HTTPException(status_code=404, detail="Nodo no encontrado")
    return nodo.update(db, nodo_actualizado)


def archivar_y_eliminar_nodo(db: Session, nodo_id: int) -> dict:
    paquetes = Paquete.filter(db, nodo_id=nodo_id)
    paquetes_archivo = [PaqueteArchivo.from_paquete(paquete) for paquete in paquetes]
    db.bulk_save_objects(paquetes_archivo)
    subquery = select(Paquete.id).filter(Paquete.nodo_id == nodo_id)
    db.execute(delete(Paquete).where(Paquete.id.in_(subquery)))
    nodo = Nodo.get(db, nodo_id)
    if nodo:
        nodo.is_active = False
        nodo.save(db)
    db.commit()
    return {"detail": "Nodo archivado y marcado como inactivo correctamente"}


def activar_nodo(db: Session, nodo_id: int) -> NodoSchema:
    nodo = Nodo.get(db, nodo_id)
    if not nodo:
        raise HTTPException(status_code=404, detail="Nodo no encontrado")

    if nodo:
        nodo.is_active = True
        nodo.save(db)
        db.commit()
    return NodoSchema.model_validate(nodo)

