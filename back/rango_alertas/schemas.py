from pydantic import BaseModel

class ConfigUpdate(BaseModel):
    rango_valido: dict
