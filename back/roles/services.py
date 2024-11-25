from typing import List

from fastapi import HTTPException
from sqlalchemy import join, select
from sqlalchemy.orm import Session

from ..permisos.models import Permiso
from ..usuarios.models import Usuario
from .models import Role, UsuarioRole
from .schemas import Role as RoleSchema
from .schemas import (
    RoleConPermisos,
    RoleCreate,
    RoleSchemares,
    RoleUpdate,
    UsuarioConRolesSchema,
)
from .schemas import UsuarioRole as UsuarioRoleSchema


def get_role(db: Session, role_id: int) -> RoleConPermisos:
    role = Role.get(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return RoleConPermisos.model_validate(role)


def get_roles(db: Session) -> list[RoleSchema]:
    roles = Role.get_all(db)
    if not roles:
        raise HTTPException(status_code=404, detail="Roles no encontrados")
    return [RoleSchema.model_validate(role) for role in roles]


def create_role(db: Session, role_data: RoleCreate) -> RoleSchema:
    role = Role.create(db, role_data)
    return RoleSchema.model_validate(role)


def update_role(db: Session, role_id: int, role_data: RoleUpdate) -> RoleSchema:
    role = Role.get(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    role.update(db, role_data)
    return RoleSchema.model_validate(role)


def delete_role(db: Session, role_id: int):
    role = Role.get(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    role.delete(db)
    return {"detail": "Rol eliminado correctamente"}


def assign_role_to_usuario(
    db: Session, usuario_role_data: UsuarioRoleSchema
) -> UsuarioRoleSchema:
    role_id = usuario_role_data.role_id
    usuario_id = usuario_role_data.usuario_id
    usuario_role = (
        db.query(UsuarioRole)
        .filter(UsuarioRole.role_id == role_id, UsuarioRole.usuario_id == usuario_id)
        .first()
    )

    if usuario_role:
        raise HTTPException(
            status_code=404, detail="El rol ya está asignado al usuario"
        )
    usuario_role = UsuarioRole.create(db, usuario_role_data)
    return UsuarioRoleSchema.model_validate(usuario_role)


def revoke_role_from_usuario(db: Session, usuario_role_data: UsuarioRoleSchema):
    role_id = usuario_role_data.role_id
    usuario_id = usuario_role_data.usuario_id

    usuario_role_instance = UsuarioRole.find_first(
        db, role_id=role_id, usuario_id=usuario_id
    )

    if not usuario_role_instance:
        raise HTTPException(
            status_code=404, detail="Relación de usuario y rol no encontrada"
        )
    usuario_role_instance.delete(db)
    return {"detail": "Rol revocado del usuario"}


def get_user_roles(db: Session) -> List[UsuarioConRolesSchema]:

    stmt = (
        select(Usuario, Role)
        .select_from(join(Usuario, UsuarioRole, Usuario.id == UsuarioRole.usuario_id))
        .join(Role, Role.id == UsuarioRole.role_id)
    )

    result = db.execute(stmt).all()

    usuarios_dict = {}
    for usuario, role in result:
        if usuario.id not in usuarios_dict:
            usuarios_dict[usuario.id] = {
                "id": usuario.id,
                "username": usuario.username,
                "roles": [],
            }
        usuarios_dict[usuario.id]["roles"].append(
            {"id": role.id, "name": role.name, "description": role.description}
        )

    usuarios_con_roles = [
        UsuarioConRolesSchema(
            id=usuario["id"],
            username=usuario["username"],
            roles=[RoleSchemares(**role) for role in usuario["roles"]],
        )
        for usuario in usuarios_dict.values()
    ]
    print(usuarios_con_roles)
    return usuarios_con_roles
