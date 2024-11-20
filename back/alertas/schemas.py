from pydantic import BaseModel

class AlarmaBase(BaseModel):
    nombre: str
    titulo_notificacion: str

class AlarmaCreate(AlarmaBase):
    pass

class AlarmaUpdate:
    id: int

class AlarmaUsuario(BaseModel):
    alarma_id: int
    usuario_id: int