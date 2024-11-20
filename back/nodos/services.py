from datetime import datetime, timedelta
from typing import List

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..nodos import schemas
from ..paquete.models import Paquete, PaqueteArchivo
from .models import Nodo
from .schemas import Nodo as NodoSchema
from .schemas import NodoUpdate


# operaciones CRUD para Nodos
def crear_nodo(db: Session, nodo: schemas.NodoCreate) -> Nodo:
    return Nodo.create(db, nodo)


def listar_nodos(db: Session) -> List[Nodo]:
    return Nodo.get_all(db)


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
    paquetes = db.query(Paquete).filter(Paquete.nodo_id == nodo_id).all()
    for paquete in paquetes:
        paquete_archivo = PaqueteArchivo(
            id=paquete.id,
            data=paquete.data,
            type=paquete.type,
            date=paquete.date,
            nodo_id=paquete.nodo_id,
        )
        db.add(paquete_archivo)
        db.delete(paquete)
    nodo = db.query(Nodo).filter(Nodo.id == nodo_id).first()
    if nodo:
        db.delete(nodo)
    db.commit()
    return {"detail": "Nodo eliminado correctamente"}
