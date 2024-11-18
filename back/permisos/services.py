from fastapi import HTTPException
from sqlalchemy.orm import Session

from .models import Permiso, RolePermiso
from .schemas import Permiso as PermisoSchema
from .schemas import PermisoCreate, PermisoUpdate
from .schemas import RolePermiso as RolePermisoSchema
from .models import Role, Permiso, RolePermiso
from .schemas import RolePermisoCreate
from .schemas import RolePermiso as RolePermisoSchema


def create_permiso(db: Session, permiso: PermisoCreate) -> PermisoSchema:
    permiso = Permiso.create(db, permiso)
    return PermisoSchema.model_validate(permiso)


def get_permiso(db: Session, permiso_id: int) -> PermisoSchema | None:
    permiso = Permiso.get(db, permiso_id)
    if not permiso:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    return PermisoSchema.model_validate(permiso)


def get_permisos(db: Session) -> list[PermisoSchema]:
    permisos = Permiso.get_all(db)
    if not permisos:
        raise HTTPException(status_code=404, detail="Permisos no encontrados")
    return [PermisoSchema.model_validate(permiso) for permiso in permisos]


def get_all_rolepermisos(db: Session) -> list[RolePermisoSchema]:
    role_permisos = RolePermiso.get_all(db)
    return [RolePermisoSchema.model_validate(rp) for rp in role_permisos]


def assign_permiso_to_role(db: Session, role_permiso_data: RolePermisoCreate):
    role_id = role_permiso_data.role_id
    permiso_id = role_permiso_data.permiso_id

    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    permiso = db.query(Permiso).filter(Permiso.id == permiso_id).first()
    if not permiso:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")

    existing_relation = (
        db.query(RolePermiso)
        .filter(RolePermiso.role_id == role_id, RolePermiso.permiso_id == permiso_id)
        .first()
    )
    if existing_relation:
        raise HTTPException(
            status_code=400, detail="El permiso ya está asignado al rol"
        )
    role_permiso = RolePermiso.create(db, role_permiso_data)
    return RolePermisoSchema.model_validate(role_permiso).model_dump()


def revoke_permiso_from_role(db: Session, role_permiso: RolePermiso):
    role_id = role_permiso.role_id
    permiso_id = role_permiso.permiso_id

    role_permiso_instances = RolePermiso.filter(
        db, role_id=role_id, permiso_id=permiso_id
    )
    role_permiso_instance = (
        role_permiso_instances[0] if role_permiso_instances else None
    )

    if not role_permiso_instance:
        raise HTTPException(
            status_code=404, detail="Relación de rol y permiso no encontrada"
        )

    role_permiso_instance.delete(db)
    return {"detail": "Permiso revocado del rol"}


# def update_permiso(
#     db: Session, permiso_id: int, permiso_data: PermisoUpdate
# ) -> PermisoSchema:
#     permiso = Permiso.get(db, permiso_id)
#     if not permiso:
#         raise HTTPException(status_code=404, detail="Permiso no encontrado")
#     permiso.update(db, permiso_data)
#     return PermisoSchema.model_validate(permiso)


# def delete_permiso(db: Session, permiso_id: int):
#     permiso = Permiso.get(db, permiso_id)
#     if not permiso:
#         raise HTTPException(status_code=404, detail="Permiso no encontrado")
#     permiso.delete(db)

#     return {"detail": "Permiso eliminado correctamente"}
