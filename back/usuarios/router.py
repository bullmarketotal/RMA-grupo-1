from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from back.database import get_db
from back.usuarios import schemas, services

from ..auth.dependencies import permiso_requerido

router = APIRouter()

# Rutas para usuarios


@router.get(
    "/usuarios",
    response_model=list[schemas.Usuario],
    dependencies=[Depends(permiso_requerido("read_usuarios"))],
)
def read_usuarios(
    db: Session = Depends(get_db),
):
    return services.listar_usuarios(db)
