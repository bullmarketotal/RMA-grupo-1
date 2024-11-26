from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user, permiso_requerido
from ..database import get_db
from ..usuarios.models import Usuario
from . import services
from .schemas import (
    Role,
    RoleCreate,
    RoleUpdate,
    UsuarioRole,
    UsuarioConRolesSchema,
)
from typing import List

router = APIRouter()


# R
@router.get(
    "/roles/{role_id}",
    response_model=Role,
    tags=["Roles"],
    dependencies=[Depends(permiso_requerido("read_roles"))],
)
def get_role(role_id: int, db: Session = Depends(get_db)):
    return services.get_role(db, role_id)


# R
@router.get(
    "/roles",
    response_model=list[Role],
    tags=["Roles"],
    dependencies=[Depends(permiso_requerido("read_roles"))],
)
def get_roles(db: Session = Depends(get_db)):
    return services.get_roles(db)


# C
@router.post(
    "/roles",
    response_model=Role,
    tags=["Roles"],
    dependencies=[Depends(permiso_requerido("create_roles"))],
)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    return services.create_role(db, role)


# U
@router.put(
    "/roles/{role_id}",
    response_model=Role,
    tags=["Roles"],
    dependencies=[Depends(permiso_requerido("update_roles"))],
)
def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    return services.update_role(db, role_id, role)


# D
@router.delete(
    "/roles/{role_id}",
    response_model=dict,
    tags=["Roles"],
    dependencies=[Depends(permiso_requerido("delete_roles"))],
)
def delete_role(role_id: int, db: Session = Depends(get_db)):
    return services.delete_role(db, role_id)


@router.post(
    "/rolesassign",
    response_model=UsuarioRole,
    tags=["RolesUsuarios"],
    dependencies=[Depends(permiso_requerido("assign_roles"))],
)
def assign_role_to_usuario(
    usuario_role_data: UsuarioRole, db: Session = Depends(get_db)
):
    return services.assign_role_to_usuario(db, usuario_role_data)


@router.delete(
    "/rolesrevoke",
    response_model=dict,
    tags=["RolesUsuarios"],
    dependencies=[Depends(permiso_requerido("assign_roles"))],
)
def revoke_role_from_usuario(
    usuario_role_data: UsuarioRole, db: Session = Depends(get_db)
):
    return services.revoke_role_from_usuario(db, usuario_role_data)


@router.get(
    "/usuarios_roles",
    response_model=List[UsuarioRole],
    tags=["RolesUsuarios"],
    dependencies=[Depends(permiso_requerido("read_usuarios_roles"))],
)
def read_usuarioroles(db: Session = Depends(get_db)):
    return services.get_all_userroles(db)


# @router.get(
#     "/usuarios_roles",
#     response_model=List[UsuarioConRolesSchema],
#     tags=["RolesUsuarios"],
# )
# def get_usuarios_con_roles(db: Session = Depends(get_db)):
#     return get_user_roles(db)
