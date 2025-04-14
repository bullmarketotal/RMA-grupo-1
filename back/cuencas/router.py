from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..auth.dependencies import permiso_requerido

from back.database import get_db
from . import schemas, models
from ..nodos import services as servicesNodos

router = APIRouter(
    prefix="/cuencas",
    tags=["cuencas"],
)


#  Obtener todas las cuencas
@router.get("/", response_model=List[schemas.Cuenca])
def obtener_cuencas(db: Session = Depends(get_db)):
    return db.query(models.Cuenca).filter(models.Cuenca.is_active == True).all()

@router.get("/cuencasinactivas", response_model=List[schemas.Cuenca])
def obtener_cuencas_inactivas(db: Session = Depends(get_db)):
    return models.Cuenca.filter(db, is_active=False)


#  Obtener una cuenca por ID
@router.get("/{cuenca_id}", response_model=schemas.Cuenca)
def obtener_cuenca(cuenca_id: int, db: Session = Depends(get_db)):
    cuenca = db.query(models.Cuenca).filter(models.Cuenca.id == cuenca_id).first()
    if not cuenca:
        raise HTTPException(status_code=404, detail="Cuenca no encontrada")
    return cuenca


#  Crear una nueva cuenca
@router.post("/", response_model=schemas.Cuenca)
def crear_cuenca(cuenca: schemas.CuencaCreate, db: Session = Depends(get_db)):
    nueva_cuenca = models.Cuenca(**cuenca.dict())
    db.add(nueva_cuenca)
    db.commit()
    db.refresh(nueva_cuenca)
    return nueva_cuenca


# Actualizar una cuenca
@router.put("/{cuenca_id}", response_model=schemas.Cuenca)
def actualizar_cuenca(cuenca_id: int, cuenca_actualizada: schemas.CuencaUpdate, db: Session = Depends(get_db)):
    cuenca = db.query(models.Cuenca).filter(models.Cuenca.id == cuenca_id).first()
    if not cuenca:
        raise HTTPException(status_code=404, detail="Cuenca no encontrada")

    for key, value in cuenca_actualizada.dict(exclude_unset=True).items():
        setattr(cuenca, key, value)

    db.commit()
    db.refresh(cuenca)
    return cuenca

@router.put(
    "/cuencasinactivas/{cuenca_id}",
    response_model=schemas.Cuenca,
    tags=["Cuencas"],
)
def actualizar_cuenca(cuenca_id: int,  db: Session = Depends(get_db)):
    cuenca = db.query(models.Cuenca).filter(models.Cuenca.id == cuenca_id).first()
    if not cuenca:
        raise HTTPException(status_code=404, detail="Cuenca no encontrado")

    if cuenca:
        cuenca.is_active = True
        db.commit()
        db.refresh(cuenca)
    return cuenca


#  Eliminar una cuenca
@router.delete("/{cuenca_id}", response_model=schemas.DeleteResponseSchema)
def eliminar_cuenca(cuenca_id: int, db: Session = Depends(get_db)):
    cuenca = db.query(models.Cuenca).filter(models.Cuenca.id == cuenca_id).first()
    if not cuenca:
        raise HTTPException(status_code=404, detail="Cuenca no encontrada")
    for nodo in cuenca.nodos:
        if nodo.is_active:
            servicesNodos.archivar_y_eliminar_nodo(db=db, nodo_id=nodo.id)

    cuenca.is_active = False
    db.commit()

    return {"detail": "Cuenca desactivada correctamente junto a sus nodos"}


