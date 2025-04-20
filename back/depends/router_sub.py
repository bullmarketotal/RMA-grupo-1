from fastapi import APIRouter, Request
from .paquetes import procesar_paquete 
from fastapi import HTTPException

router = APIRouter()

@router.post("/suscriptor")
async def recibir_paquete_crudo(request: Request):
    body = await request.body()
    mensaje = body.decode()
    try:
        resultado = procesar_paquete(mensaje)
        return {"detail": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando el paquete: {str(e)}")



@router.get("/ping")
async def ping():
    return {"status": "ok"}

