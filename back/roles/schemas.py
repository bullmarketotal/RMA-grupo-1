from pydantic import BaseModel
from pydantic import field_validator
from typing import Optional
from typing import List, Optional
from ..permisos.schemas import Permiso
from ..usuarios.schemas import UsuarioBase


class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

    @field_validator("name")
    def validate_name_length(cls, v):
        if len(v) < 3:
            raise ValueError("El nombre del rol debe tener al menos 3 caracteres.")
        return v


class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass


class Role(RoleBase):
    id: int
    model_config = {"from_attributes": True}


class UsuarioRoleBase(BaseModel):
    usuario_id: int
    role_id: int


class UsuarioRoleCreate(UsuarioRoleBase):
    pass


class UsuarioRoleUpdate(UsuarioRoleBase):
    pass


class UsuarioRole(UsuarioRoleBase):
    model_config = {"from_attributes": True}


class RoleConPermisos(Role):
    permisos: List[Permiso]


class RoleSchemares(BaseModel):
    id: int
    name: str
    description: str


class UsuarioConRolesSchema(BaseModel):
    id: int
    username: str
    roles: List[RoleSchemares]
    model_config = {"from_attributes": True}
