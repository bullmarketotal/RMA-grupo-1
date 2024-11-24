from fastapi import APIRouter, HTTPException
from .services import load_config, update_config
from pydantic import BaseModel

router = APIRouter(prefix="/config", tags=["Config"])

class ConfigUpdate(BaseModel):
    umbral: dict

@router.get("/")
async def get_config():
    try:
        return load_config()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Errorrrrr al cargar la configuración: {str(e)}")

@router.put("/")
async def update_config_endpoint(config_update: ConfigUpdate):
    try:
        current_config = load_config()
        
        current_config['umbral'] = config_update.umbral

        update_config(current_config)

        return {"message": "Configuración actualizada correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la configuración: {str(e)}")

