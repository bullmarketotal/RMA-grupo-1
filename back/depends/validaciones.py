
from back.paquete.schemas import PaqueteBase, PaqueteRechazado
from back.paquete.services import crear_paquete_rechazado
from ..database import get_db
from back.alertas.push_notifications import NotificationHandler
from back.nodos.models import Nodo

notifications = NotificationHandler()

def validar_o_archivar(paquete: PaqueteBase, umbral: list, name: str) -> bool:
    motivo = None

    if(paquete.data < umbral[0]):
        motivo = f"{name}: {paquete.data}  (mínimo: {umbral[0]})"
    if(paquete.data > umbral[1]):
        motivo = f"{name}: {paquete.data} (máximo: {umbral[1]})"

    if motivo is None:
        return True
    else:
        # archivar paquete invalido
        paquete_rechazado = PaqueteRechazado(**{
            "nodo_id": paquete.nodo_id,
            "date": paquete.date,
            "data": paquete.data,
            "type_id": paquete.type_id,
            "motivo": motivo
        })
        print("rechazando paquete : ", paquete_rechazado)
        db = next(get_db())
        nodo = Nodo.get(db, paquete.nodo_id)
        notifications.trigger_notification(db = db, message=f"{nodo.identificador} | {motivo}", alerta_id=4)
        crear_paquete_rechazado(next(get_db()), paquete_rechazado)
        return False

def es_valido(paquete: PaqueteBase) -> bool:
    from back.main import CONFIG
    if paquete.type_id == CONFIG["type"]["temperatura"]:
        return validar_o_archivar(paquete, CONFIG["umbral"]["temperatura"], name="temperatura")
    if paquete.type_id == CONFIG["type"]["tension"]:
        return validar_o_archivar(paquete, CONFIG["umbral"]["tension"], name="tensión")
    if paquete.type_id == CONFIG["type"]["nivel_hidrometrico"]:
        return validar_o_archivar(paquete, CONFIG["umbral"]["nivel_hidrometrico"], name="nivel hidrométrico")
    if paquete.type_id == CONFIG["type"]["precipitacion"]:
        return validar_o_archivar(paquete, CONFIG["umbral"]["precipitacion"], name="precipitación")

    
    print(f"Tipo de dato {paquete.type_id} invalido")
    return False
    