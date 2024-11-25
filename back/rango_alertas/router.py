from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .services import load_config, update_config

router = APIRouter(prefix="/alertaconfig", tags=["AlertaConfig"])

class ConfigUpdate(BaseModel):
    nivel_hidrometrico_alertas: dict
    tension_bateria_baja: float


@router.get("/")
async def get_config():
    try:
        current_config = load_config()
        return {
            "nivel_hidrometrico_alertas": current_config.get("nivel_hidrometrico_alertas"),
            "tension_bateria_baja": current_config.get("tension_bateria_baja"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al cargar rrrrla configuración: {str(e)}")


@router.put("/")
async def update_config_endpoint(config_update: ConfigUpdate):
    try:
        current_config = load_config()

        for key, value in config_update.nivel_hidrometrico_alertas.items():
            if not isinstance(value, (int, float)):
                raise HTTPException(
                    status_code=422,
                    detail=f"El valor de {key} debe ser un número.",
                )
     
        if config_update.tension_bateria_baja < 0:
            raise HTTPException(
                status_code=422,
                detail="El valor de 'tension_bateria_baja' no puede ser negativo.",
            )

        current_config["nivel_hidrometrico_alertas"] = config_update.nivel_hidrometrico_alertas
        current_config["tension_bateria_baja"] = config_update.tension_bateria_baja
        update_config(current_config)

        return {"message": "Configuración actualizada correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la configuración: {str(e)}")
