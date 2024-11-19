import json
from datetime import datetime
from typing import Optional

from ..database import get_db
from ..paquete.schemas import PaqueteBase
from ..paquete.services import crear_paquete

from ..database import get_db
from ..paquete.schemas import PaqueteBase
from ..paquete.services import crear_paquete
from ..depends.validaciones import es_valido


def guardar_paquete_en_db(paquete: PaqueteBase) -> None:
    crear_paquete(next(get_db()), paquete)
    print(f"Guardado: {paquete}")


def procesar_mensaje(mensaje) -> Optional[PaqueteBase]:
    mensaje = mensaje.replace("'", '"')
    mensaje_json = json.loads(mensaje)
    try:
        mensaje_paquete = {
            "nodo_id": mensaje_json["id"],
            "type_id": int(mensaje_json["type"]),
            "data": float(mensaje_json["data"]),
            "date": datetime.fromtimestamp(mensaje_json["time"]),
        }
        paquete = PaqueteBase(**mensaje_paquete)
        return paquete
    except Exception as e:
        print(f"Error de validación: {e}")


def mi_callback(mensaje: str) -> None:
    print(f"he recibido: {mensaje}")
    paquete = procesar_mensaje(mensaje)

    if paquete is not None and es_valido(paquete):
        guardar_paquete_en_db(paquete)
