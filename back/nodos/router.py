from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from back.database import get_db
from back.nodos import models, schemas, services

# import models, schemas, exceptions, services

router = APIRouter()

# Rutas para nodos


@router.get("/nodos", response_model=list[schemas.Nodo])
def read_nodos(db: Session = Depends(get_db)):
    return services.listar_nodos(db)


@router.post("/nodos", response_model=schemas.Nodo)
def create_nodo(nodo: schemas.NodoCreate, db: Session = Depends(get_db)):
    return services.crear_nodo(db, nodo)


@router.get("/nodo/{id}", response_model=schemas.Nodo)
def read_nodo(id: int, db: Session = Depends(get_db)):
    return services.get_nodo(id, db)


@router.put("/nodo/{nodo_id}", response_model=schemas.Nodo)
def update_nodo(nodo_id: int, nodo: schemas.NodoUpdate, db: Session = Depends(get_db)):
    return services.modificar_nodo(db, nodo_id, nodo)
