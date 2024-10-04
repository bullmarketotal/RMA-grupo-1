from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from back.database import get_db
from back.paquete import services, schemas, models


router = APIRouter()

# Rutas para Paquetees


@router.get("/paquetes", response_model=list[schemas.Paquete])
def read_Paquetes(db: Session = Depends(get_db)):
    return services.listar_Paquetes(db)
