from pydantic import BaseModel


class PermisoBase(BaseModel):
    identificador: str
    descripcion: str


class PermisoCreate(PermisoBase):
    pass


class PermisoUpdate(PermisoBase):
    pass


class Permiso(PermisoBase):
    id: int
    model_config = {"from_attributes": True}


class RolePermisoBase(BaseModel):
    role_id: int
    permiso_id: int


class RolePermisoCreate(RolePermisoBase):
    pass


class RolePermisoUpdate(RolePermisoBase):
    pass


class RolePermiso(RolePermisoBase):
    model_config = {"from_attributes": True}
