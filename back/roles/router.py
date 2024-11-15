from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user, permiso_requerido
from ..database import get_db
from ..usuarios.models import Usuario
from . import services
from .schemas import Role, RoleCreate, RoleUpdate, UsuarioRole

router = APIRouter()


# Test auth y roles
@router.get("/protected")
def read_protected_data(current_user: Usuario = Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}!"}


@router.get("/roles_seguros")
async def obtener_roles_seguros(
    permisos: bool = Depends(permiso_requerido("string")),
):
    return {"roles": ["Admin", "Usuario"]}


##############################################


@router.post("/roles", response_model=Role, tags=["Roles"])
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    return services.create_role(db, role)


@router.get("/roles/{role_id}", response_model=Role, tags=["Roles"])
def get_role(role_id: int, db: Session = Depends(get_db)):
    return services.get_role(db, role_id)


@router.get("/roles", response_model=list[Role], tags=["Roles"])
def get_roles(db: Session = Depends(get_db)):
    return services.get_roles(db)


@router.put("/roles/{role_id}", response_model=Role, tags=["Roles"])
def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    return services.update_role(db, role_id, role)


@router.delete("/roles/{role_id}", response_model=dict, tags=["Roles"])
def delete_role(role_id: int, db: Session = Depends(get_db)):
    return services.delete_role(db, role_id)


@router.post("/rolesassign", response_model=dict, tags=["Roles"])
def assign_role_to_usuario(
    usuario_role_data: UsuarioRole, db: Session = Depends(get_db)
):
    return services.assign_role_to_usuario(db, usuario_role_data)


@router.delete("/rolesrevoke", response_model=dict, tags=["Roles"])
def revoke_role_from_usuario(
    usuario_role_data: UsuarioRole, db: Session = Depends(get_db)
):
    return services.revoke_role_from_usuario(db, usuario_role_data)
