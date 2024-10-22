from datetime import datetime, timedelta

# CONFIGURACION

# Cantidad de datos a enviar
ENTRY_COUNT = 1
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
        "data": temp,
        "nivel_hidrometrico": nivel,
        "time": fecha_hora.strftime("%Y-%m-%d %H:%M:%S.%f")
    }

    # Convertir el mensaje a formato JSON
    mensaje_json = json.dumps(mensaje)

    # Enviar el mensaje al topic mediante MQTT
    client.publish(TOPIC, mensaje_json)

    # Imprimir el mensaje para verificar
    print(f"Mensaje enviado: {mensaje_json}")
    time.sleep(0.2)

