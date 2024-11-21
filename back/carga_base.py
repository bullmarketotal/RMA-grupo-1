"""
    EL SCRIPT SE EJECUTA EN EL MISMO ENTORNO (VENV) QUE USAMOS PARA EJECUTAR FASTAPI

    python carga_base.py --count N1 --nodo N2 --type

    con "count" definimos cuantos datos queremos que genere. Por default va a generar 100 entradas.
 """

from datetime import datetime, timedelta

# CONFIGURACION

DEFAULT_ENTRY_COUNT = 500  # abarca 7 dias
# Cada cuantos minutos llegan los datos
MINUTES_BETWEEN_ENTRIES = 20
DEFAULT_NODO = 1
DEFAULT_TYPE = 1

# Temperaturas máximas y minimas permitidas
MAX_TEMP = 40
MIN_TEMP = -10

# Delay entre mensajes
TIME_BETWEEN_MESSAGES = 0.001  # segundos

# Valores iniciales
data = 15


import random
import time
import os
import json
import paho.mqtt.client as mqtt
from dotenv import load_dotenv

load_dotenv()

import argparse

# Configuración de argparse para manejar argumentos de línea de comandos
parser = argparse.ArgumentParser(
    description="Enviar datos de temperatura y nivel hidrométrico a través de MQTT."
)
parser.add_argument(
    "--count",
    type=int,
    default=DEFAULT_ENTRY_COUNT,
    help="Número de entradas a generar",
)
parser.add_argument(
    "--nodo", type=int, default=DEFAULT_NODO, help="Nodo de sensor a utilizar"
)
parser.add_argument(
    "--type", type=int, default=DEFAULT_TYPE, help="Tipo de dato a enviar"
)
parser.add_argument(
    "--data", type=int, default=None, help="Dato para enviar manualmente"
)

args = parser.parse_args()

ENTRY_COUNT = args.count

start_date = datetime.now() - timedelta(minutes=args.count * MINUTES_BETWEEN_ENTRIES)

# Configuración MQTT
BROKER = os.getenv("MQTT_HOST")
PORT = int(os.getenv("MQTT_PORT"))
TOPIC = os.getenv("MQTT_TOPIC")

# Inicialización del cliente MQTT
client = mqtt.Client()

# Conectar al broker MQTT
client.connect(BROKER, PORT, 60)


def getValidType(type):
    if type in [1, 14, 16, 25]:
        return type
    else:
        if type is None:
            print("Enviando tipo de dato predeterminado - type: ", DEFAULT_TYPE)
            return DEFAULT_TYPE
        else:
            print(
                "type incorrecto.\n -> 1: temp | 14: precipitacion | 16: tension | 25: nivel hidrométrico"
            )
            exit(0)


TYPE_TO_SEND = getValidType(args.type)


def getLimitsFromType(type):

    ruta = os.path.join(os.path.dirname(__file__), "config.json")
    if os.path.exists(ruta):
        with open(ruta, "r") as archivo:
            config = json.load(archivo)
    else:
        print("Error: config.json no encontrado.")
        exit(-1)

    if type == 1:
        return config["umbral"]["temperatura"]
    if type == 14:
        return config["umbral"]["precipitacion"]
    if type == 16:
        return config["umbral"]["tension"]
    if type == 25:
        return config["umbral"]["nivel_hidrometrico"]
    raise Exception("Tipo incorrecto")


# Limites de datos segun el tipo
[MIN, MAX] = getLimitsFromType(TYPE_TO_SEND)
data = (MIN + MAX) / 2  # la serie inicia en el medio
valid_types = [1, 14, 16, 25]
# Generación de datos
for i in range(ENTRY_COUNT):
    fecha_hora = start_date + timedelta(minutes=i * MINUTES_BETWEEN_ENTRIES)
    TYPE_TO_SEND = random.choice(valid_types)
    # Simulación de la temperatura
    if TYPE_TO_SEND == 1:
        data += (random.random() - 0.5) * 4
        if 8 <= fecha_hora.hour < 16:
            data += 1  # Subida durante el día
        elif fecha_hora.hour >= 16:
            data -= 1  # Bajada hacia la noche
    # Simulación del nivel
    elif TYPE_TO_SEND == 25:
        data += (random.random() - 0.5) * 20
    # Simulación de la tension
    elif TYPE_TO_SEND == 16:
        data += random.random() - 0.5
    # Simulación de la precipitacion
    elif TYPE_TO_SEND == 14:
        random_number = random.random() - 0.5
        if random_number > 0.3:
            data = 0
        else:
            data = random_number * 3

    # Limitar el dato
    data = max(MIN, min(MAX, data))

    # Crear el mensaje JSON
    mensaje = {
        "id": args.nodo,
        "type": TYPE_TO_SEND,
        "data": args.data if args.data is not None else data,
        "time": int(fecha_hora.timestamp()),
    }

    # Convertir el mensaje a formato JSON
    mensaje_json = json.dumps(mensaje)

    # Enviar el mensaje al topic mediante MQTT
    client.publish(TOPIC, mensaje_json)

    # Imprimir el mensaje para verificar
    print(f"Mensaje enviado: {mensaje_json}")
    print(args.data)
    if args.data is not None:
        exit(0)
    time.sleep(TIME_BETWEEN_MESSAGES)
