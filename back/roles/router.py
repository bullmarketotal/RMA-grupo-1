from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from back.database import get_db
from back.roles import models, schemas, services

router = APIRouter()


@router.get("/roles", response_model=list[schemas.RolBase])
def read_sensores(db: Session = Depends(get_db)):
    return services.listar_roles(db)