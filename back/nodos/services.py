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


def get_nodo(db: Session, nodo_id: int) -> NodoSchema | None:
    nodo = Nodo.get(db, nodo_id)
    if not nodo:
        raise HTTPException(status_code=404, detail="Nodo no encontrado")
    return NodoSchema.model_validate(nodo)


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
        # Soft delete
        nodo.is_active = False
        nodo.save(db)
    db.commit()
    return {"detail": "Nodo archivado y marcado como inactivo correctamente"}
