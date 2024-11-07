
from back.paquete.schemas import PaqueteBase, PaqueteRechazado


def validar_o_archivar(paquete: PaqueteBase, umbral: list, name: str) -> bool:
    motivo = None

    if(paquete.data < umbral[0]):
        motivo = f"Valor de {name}: {paquete.data} menor a {umbral[0]}"
    if(paquete.data > umbral[1]):
        motivo = f"Valor de {name}: {paquete.data} mayor a {umbral[1]}"

    if paquete.motivo is None:
        return True
    else:
        # archivar paquete invalido
        paquete_rechazado = PaqueteRechazado(**{
            "nodo_id": paquete.sensor_id,
            "date": paquete.date,
            "data": paquete.data,
            "type": paquete.type,
            "motivo": motivo
        })
        paquete_rechazado.save()
        return False

def es_valido(paquete: PaqueteBase) -> bool:
    from back.main import CONFIG
    if paquete.type == CONFIG.type.temperatura: 
        return validar_o_archivar(paquete, CONFIG.umbral.temperatura, name="temperatura")
    if paquete.type == CONFIG.type.tension:
        return validar_o_archivar(paquete, CONFIG.umbral.tension, name="tensión")
    if paquete.type == CONFIG.type.nivel_hidrometrico:
        return validar_o_archivar(paquete, CONFIG.umbral.nivel_hidrometrico, name="nivel hidrométrico")
    if paquete.type == CONFIG.type.precipitacion:
        return validar_o_archivar(paquete, CONFIG.umbral.precipitacion, name="precipitación")
    
    print(f"Tipo de dato {paquete.type} invalido")
    return False
    