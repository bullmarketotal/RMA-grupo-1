""" 
    EL SCRIPT SE EJECUTA EN EL MISMO ENTORNO (VENV) QUE USAMOS PARA EJECUTAR FASTAPI

    Por default el script va a generar 100 entradas de datos.
    
    Al invocarlo con --count N, se van a generar N entradas
 """

from datetime import datetime, timedelta

# CONFIGURACION

DEFAULT_ENTRY_COUNT = 100
TIME_BETWEEN_MESSAGES = 0.2 # segundos

# Temperaturas máximas y minimas permitidas
MAX_TEMP = 40
MIN_TEMP = -10

# Cada cuantos minutos llegan los datos
MINUTES_BETWEEN_ENTRIES = 20

# Valores iniciales
start_date = datetime.now() - timedelta(days=7)
temp = 15  
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
args = parser.parse_args()

ENTRY_COUNT = args.count

# Configuración MQTT
BROKER = os.getenv("MQTT_HOST")
PORT = int(os.getenv("MQTT_PORT"))
TOPIC = os.getenv("MQTT_TOPIC")

# Inicialización del cliente MQTT
client = mqtt.Client()

# Conectar al broker MQTT
client.connect(BROKER, PORT, 60)




# Generación de datos
for i in range(ENTRY_COUNT):
    fecha_hora = start_date + timedelta(minutes=i * MINUTES_BETWEEN_ENTRIES)

    # Simulación de la temperatura
    temp += (random.random() - 0.5) * 4  # Variación de +-2 grados
    if 8 <= fecha_hora.hour < 16:
        temp += 1  # Subida durante el día
    elif fecha_hora.hour >= 16:
        temp -= 1  # Bajada hacia la noche

    # Limitar la temperatura
    temp = max(MIN_TEMP, min(MAX_TEMP, temp))

    # Simulación del nivel hidrométrico
    nivel += (random.random() - 0.53) * 0.5  # Variación ligera del nivel
    nivel = max(0, min(5, nivel))  # Limitar el nivel entre 0 y 5

     # Crear el mensaje JSON
    mensaje = {
        "id": 1,
        "temperatura": temp,
        "nivel_hidrometrico": nivel,
        "time": fecha_hora.strftime("%Y-%m-%d %H:%M:%S.%f")
    }

    # Convertir el mensaje a formato JSON
    mensaje_json = json.dumps(mensaje)

    # Enviar el mensaje al topic mediante MQTT
    client.publish(TOPIC, mensaje_json)

    # Imprimir el mensaje para verificar
    print(f"Mensaje enviado: {mensaje_json}")
    time.sleep(TIME_BETWEEN_MESSAGES)

