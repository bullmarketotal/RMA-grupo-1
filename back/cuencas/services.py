from sqlalchemy.orm import Session
from typing import List, Optional

from . import models, schemas


#  Obtener todas las cuencas
def obtener_cuencas(db: Session) -> List[models.Cuenca]:
    return db.query(models.Cuenca).all()


#  Obtener una cuenca por ID
def obtener_cuenca_por_id(db: Session, cuenca_id: int) -> Optional[models.Cuenca]:
    return db.query(models.Cuenca).filter(models.Cuenca.id == cuenca_id).first()


#  Crear una nueva cuenca
def crear_cuenca(db: Session, cuenca_data: schemas.CuencaCreate) -> models.Cuenca:
    nueva_cuenca = models.Cuenca(**cuenca_data.dict())
    db.add(nueva_cuenca)
    db.commit()
    db.refresh(nueva_cuenca)
    return nueva_cuenca


#  Actualizar una cuenca
def actualizar_cuenca(db: Session, cuenca_id: int, cuenca_data: schemas.CuencaUpdate) -> Optional[models.Cuenca]:
    cuenca = obtener_cuenca_por_id(db, cuenca_id)
    if not cuenca:
        return None

    for key, value in cuenca_data.dict(exclude_unset=True).items():
        setattr(cuenca, key, value)

    db.commit()
    db.refresh(cuenca)
    return cuenca


#  Eliminar una cuenca
def eliminar_cuenca(db: Session, cuenca_id: int) -> bool:
    cuenca = obtener_cuenca_por_id(db, cuenca_id)
    if not cuenca:
        return False

    db.delete(cuenca)
    db.commit()
    return True
