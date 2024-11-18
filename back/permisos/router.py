from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import services
from .schemas import (
    Permiso,
    RolePermisoCreate,
    RolePermiso,
)
from ..database import get_db

router = APIRouter()


@router.get("/permisos/{permiso_id}", response_model=Permiso, tags=["Permisos"])
def get_permiso(permiso_id: int, db: Session = Depends(get_db)):
    return services.get_permiso(db, permiso_id)


@router.get("/permisos", response_model=list[Permiso], tags=["Permisos"])
def get_permisos(db: Session = Depends(get_db)):
    return services.get_permisos(db)


@router.get("/permisos_role", response_model=list[RolePermiso], tags=["RolesPermisos"])
def read_rolepermisos(db: Session = Depends(get_db)):
    return services.get_all_rolepermisos(db)


@router.post("/permisosassign", response_model=dict, tags=["RolesPermisos"])
def assign_permiso_to_role(
    role_permiso_data: RolePermisoCreate, db: Session = Depends(get_db)
):
    return services.assign_permiso_to_role(db, role_permiso_data)


@router.delete("/permisosrevoke", response_model=dict, tags=["RolesPermisos"])
def revoke_permiso_from_role(
    role_permiso_data: RolePermiso, db: Session = Depends(get_db)
):
    return services.revoke_permiso_from_role(db, role_permiso_data)
