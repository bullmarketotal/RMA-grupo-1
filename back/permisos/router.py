from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import services
from .schemas import (
    PermisoCreate,
    PermisoUpdate,
    Permiso,
    RolePermisoCreate,
    RolePermiso,
)
from ..database import get_db

router = APIRouter()


@router.get("/permisos", response_model=list[Permiso], tags=["Permisos"])
def get_permisos(db: Session = Depends(get_db)):
    return services.get_permisos(db)


@router.get("/permisos/{permiso_id}", response_model=Permiso, tags=["Permisos"])
def get_permiso(permiso_id: int, db: Session = Depends(get_db)):
    return services.get_permiso(db, permiso_id)


@router.post("/permisos", response_model=Permiso, tags=["Permisos"])
def create_permiso(permiso: PermisoCreate, db: Session = Depends(get_db)):
    return services.create_permiso(db, permiso)


@router.put("/permisos/{permiso_id}", response_model=Permiso, tags=["Permisos"])
def update_permiso(
    permiso_id: int, permiso: PermisoUpdate, db: Session = Depends(get_db)
):
    return services.update_permiso(db, permiso_id, permiso)


@router.delete("/permisos/{permiso_id}", response_model=Permiso, tags=["Permisos"])
def delete_permiso(permiso_id: int, db: Session = Depends(get_db)):
    return services.delete_permiso(db, permiso_id)


@router.get("/permisos_role", response_model=list[RolePermiso], tags=["RolesPermisos"])
def read_rolepermisos(db: Session = Depends(get_db)):
    return services.get_all_rolepermisos(db)


@router.post("/permisosassign", response_model=dict, tags=["Permisos"])
def assign_permiso_to_role(
    role_permiso_data: RolePermisoCreate, db: Session = Depends(get_db)
):
    return services.assign_permiso_to_role(db, role_permiso_data)


@router.delete("/permisosrevoke", response_model=dict, tags=["Permisos"])
def revoke_permiso_from_role(
    role_permiso_data: RolePermisoCreate, db: Session = Depends(get_db)
):
    return services.revoke_permiso_from_role(db, role_permiso_data)
