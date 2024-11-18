"""
    EL SCRIPT SE EJECUTA EN EL MISMO ENTORNO (VENV) QUE USAMOS PARA EJECUTAR FASTAPI

    python carga_base.py --count N1 --nodo N2

    con "count" definimos cuantos datos queremos que genere. Por default va a generar 100 entradas.
 """

from datetime import datetime, timedelta

# CONFIGURACION

DEFAULT_ENTRY_COUNT = 500 # abarca 7 dias
# Cada cuantos minutos llegan los datos
MINUTES_BETWEEN_ENTRIES = 20
DEFAULT_NODO = 1
DEFAULT_TYPE = 1

# Temperaturas máximas y minimas permitidas
MAX_TEMP = 40
MIN_TEMP = -10

# Delay entre mensajes
TIME_BETWEEN_MESSAGES = 0.1 # segundos

# Valores iniciales
data = 15  
nivel = 2  


import random
import time
import os
import json
import paho.mqtt.client as mqtt
from dotenv import load_dotenv

load_dotenv()

import argparse

# Configuración de argparse para manejar argumentos de línea de comandos
parser = argparse.ArgumentParser(description='Enviar datos de temperatura y nivel hidrométrico a través de MQTT.')
parser.add_argument('--count', type=int, default=DEFAULT_ENTRY_COUNT, help='Número de entradas a generar')
parser.add_argument('--nodo', type=int, default=DEFAULT_NODO, help="Nodo de sensor a utilizar")
parser.add_argument('--type', type=int, default=DEFAULT_TYPE, help="Tipo de dato a enviar")
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
        print("Enviando tipo de dato predeterminado - type: ", DEFAULT_TYPE)
        return DEFAULT_TYPE

TYPE_TO_SEND = getValidType(args.type)

# Generación de datos
for i in range(ENTRY_COUNT):
    fecha_hora = start_date + timedelta(minutes=i * MINUTES_BETWEEN_ENTRIES)

    # Simulación de la temperatura
    data += (random.random() - 0.5) * 4  # Variación de +-2 grados
    if 8 <= fecha_hora.hour < 16:
        data += 1  # Subida durante el día
    elif fecha_hora.hour >= 16:
        data -= 1  # Bajada hacia la noche

    # Limitar la temperatura
    data = max(MIN_TEMP, min(MAX_TEMP, data))

    # Simulación del nivel hidrométrico
    nivel += (random.random() - 0.53) * 0.5  # Variación ligera del nivel
    nivel = max(0, min(5, nivel))  # Limitar el nivel entre 0 y 5

     # Crear el mensaje JSON
    mensaje = {
        "id": args.nodo,
        "type": TYPE_TO_SEND,
        "data": data,
        "time": int(fecha_hora.timestamp())
    }

    # Convertir el mensaje a formato JSON
    mensaje_json = json.dumps(mensaje)

    # Enviar el mensaje al topic mediante MQTT
    client.publish(TOPIC, mensaje_json)

    # Imprimir el mensaje para verificar
    print(f"Mensaje enviado: {mensaje_json}")
    time.sleep(TIME_BETWEEN_MESSAGES)

