from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import services
from .schemas import (
    Permiso,
    RolePermisoCreate,
    RolePermiso,
)
from ..database import get_db
from ..auth.dependencies import permiso_requerido

router = APIRouter()


@router.get(
    "/permisos/{permiso_id}",
    response_model=Permiso,
    tags=["Permisos"],
    dependencies=[Depends(permiso_requerido("read_permisos"))],
)
def get_permiso(permiso_id: int, db: Session = Depends(get_db)):
    return services.get_permiso(db, permiso_id)


@router.get(
    "/permisos",
    response_model=list[Permiso],
    tags=["Permisos"],
    dependencies=[Depends(permiso_requerido("read_permisos"))],
)
def get_permisos(db: Session = Depends(get_db)):
    return services.get_permisos(db)


@router.get(
    "/permisos_role",
    response_model=list[RolePermiso],
    tags=["RolesPermisos"],
    dependencies=[Depends(permiso_requerido("read_rolepermisos"))],
)
def read_rolepermisos(db: Session = Depends(get_db)):
    return services.get_all_rolepermisos(db)


@router.post(
    "/permisosassign",
    response_model=dict,
    tags=["RolesPermisos"],
    dependencies=[Depends(permiso_requerido("assign_permiso"))],
)
def assign_permiso_to_role(
    role_permiso_data: RolePermisoCreate, db: Session = Depends(get_db)
):
    return services.assign_permiso_to_role(db, role_permiso_data)


@router.delete(
    "/permisosrevoke",
    response_model=dict,
    tags=["RolesPermisos"],
    dependencies=[Depends(permiso_requerido("assign_permiso"))],
)
def revoke_permiso_from_role(
    role_permiso_data: RolePermiso,
    db: Session = Depends(get_db),
):
    return services.revoke_permiso_from_role(db, role_permiso_data)
