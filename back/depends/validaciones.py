from back.paquete.schemas import PaqueteBase, PaqueteRechazado
from back.paquete.services import crear_paquete_rechazado
from ..database import get_db
from back.alertas.push_notifications import NotificationHandler
from back.nodos.models import Nodo
from ..nodos.services import listar_nodos
from back.paquete.models import Paquete as ModeloPaquete
from back.paquete.models import PaqueteRechazado as ModeloPaqueteRechazado
from ..database import get_db
from sqlalchemy.orm import Session

notifications = NotificationHandler()


def validar_o_archivar(paquete: PaqueteBase, umbral: list, name: str) -> bool:
    motivo = None

    if paquete.data < umbral[0]:
        motivo = f"{name}: {paquete.data}  (mínimo: {umbral[0]})"
    if paquete.data > umbral[1]:
        motivo = f"{name}: {paquete.data} (máximo: {umbral[1]})"

    if motivo is None:
        return True
    else:
        print("--Rechazando paquete : ", paquete)
        try:
            paquete_rechazado = PaqueteRechazado(
                **{
                    "nodo_id": paquete.nodo_id,
                    "date": paquete.date,
                    "data": paquete.data,
                    "type_id": paquete.type_id,
                    "motivo": motivo,
                }
            )
            db = next(get_db())
            nodo = Nodo.get(db, paquete.nodo_id)
            notifications.trigger_notification(
                db=db, message=motivo, alerta_id=4, nodo_id=paquete.nodo_id
            )
            crear_paquete_rechazado(db, paquete_rechazado)
        except Exception as e:
            print(f"--Error archivando o notificando paquete inválido: {e}")

        return False



def es_valido(paquete: PaqueteBase) -> bool:
    from .config import get_config_alertas

    CONFIG = get_config_alertas()
    if paquete.type_id == CONFIG["type"]["temperatura"]:
        return validar_o_archivar(
            paquete, CONFIG["umbral"]["temperatura"], name="temperatura"
        )
    if paquete.type_id == CONFIG["type"]["tension"]:
        return validar_o_archivar(paquete, CONFIG["umbral"]["tension"], name="tensión")
    if paquete.type_id == CONFIG["type"]["nivel_hidrometrico"]:
        return validar_o_archivar(
            paquete, CONFIG["umbral"]["nivel_hidrometrico"], name="nivel hidrométrico"
        )
    if paquete.type_id == CONFIG["type"]["precipitacion"]:
        return validar_o_archivar(
            paquete, CONFIG["umbral"]["precipitacion"], name="precipitación"
        )

    print(f"Tipo de dato {paquete.type_id} invalido")
    return False


def nodo_is_activo(paquete: PaqueteBase) -> bool:
    db = next(get_db())
    nodo_id = paquete.nodo_id

    if nodo_id is None:
        return False

    nodos_activos = listar_nodos(db)
    nodo_ids_activos = [nodo.id for nodo in nodos_activos]

    return nodo_id in nodo_ids_activos




def no_repetido(paquete: PaqueteBase) -> bool:
    db: Session = next(get_db())

    existe_valido = (
        db.query(ModeloPaquete)
        .filter(
            ModeloPaquete.nodo_id == paquete.nodo_id,
            ModeloPaquete.date == paquete.date,
            ModeloPaquete.type_id == paquete.type_id
        )
        .first()
    )

    existe_rechazado = (
        db.query(ModeloPaqueteRechazado)
        .filter(
            ModeloPaqueteRechazado.nodo_id == paquete.nodo_id,
            ModeloPaqueteRechazado.date == paquete.date,
            ModeloPaqueteRechazado.type_id == paquete.type_id
        )
        .first()
    )

    if existe_valido or existe_rechazado:
        print("📛 Paquete duplicado detectado: ", paquete )
        return False

    return True


