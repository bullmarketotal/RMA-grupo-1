import json
from datetime import datetime
from typing import Optional

from ..database import get_db
from ..depends.validaciones import es_valido, nodo_is_activo, no_repetido
from ..paquete.schemas import PaqueteCreate
from ..paquete.services import crear_paquete
from ..alertas.push_notifications import NotificationHandler


def guardar_paquete_en_db(paquete: PaqueteCreate) -> None:
    crear_paquete(next(get_db()), paquete)
    print(f"Guardado: {paquete}")


def procesar_mensaje(mensaje) -> Optional[PaqueteCreate]:
    mensaje = mensaje.replace("'", '"')
    mensaje_json = json.loads(mensaje)
    try:
        mensaje_paquete = {
            "nodo_id": mensaje_json["id"],
            "type_id": int(mensaje_json["type"]),
            "data": float(mensaje_json["data"]),
            "date": datetime.fromtimestamp(mensaje_json["time"]),
        }
        paquete = PaqueteCreate(**mensaje_paquete)
        print("paquete procesado", paquete)
        return paquete
    except Exception as e:
        print(f"Error de validación: {e}")


notifications = NotificationHandler()


def procesar_paquete(mensaje: str) -> str:
    print(f"he recibido: {mensaje}")
    paquete = procesar_mensaje(mensaje)
    print("paquete sin pro", paquete)
    
    if paquete is None:
        return "Paquete inválido"
    
    if not no_repetido(paquete):
        return "Paquete ya recibido"

    if not nodo_is_activo(paquete):
        return "Nodo inactivo"

    if not es_valido(paquete):
        return "Paquete rechazado"



    notifications.if_alert_notificate(paquete, db=next(get_db()))
    guardar_paquete_en_db(paquete)
    return "Paquete guardado"

