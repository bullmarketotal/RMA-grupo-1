import os
import sys
import paho.mqtt.client as paho
from paho.mqtt.enums import MQTTProtocolVersion
from dotenv import load_dotenv
from datetime import datetime
from sqlalchemy.orm import Session
from paquete.schemas import PaqueteCreate
from paquete.services import crear_paquete
from database import get_db


load_dotenv()
TOPIC = os.getenv("MQTT_TOPIC")


def message_handling(client, userdata, msg):
    print(msg.payload.decode())
    mensaje = msg.payload.decode()
    sensor_id=mensaje.get("id")
    temperatura=mensaje.get("data")
    time=mensaje.get("time")

    crear_paquete(next(get_db()),PaqueteCreate(
        sensor_id=sensor_id,
        temperatura=temperatura,
        #nivel hidrometrico temporal
        nivel_hidrometrico=0,
        date=time
    ))


def on_connect(client: paho.Client, obj, flags, reason_code):
    if client.is_connected():
        print("Suscriptor conectado!")
        client.subscribe(TOPIC, qos=1)


def on_subscribe(client, userdata, mid, granted_qos):
    print(f"Suscrito a {TOPIC}!")


client = paho.Client()
client.on_message = message_handling
client.on_connect = on_connect
client.on_subscribe = on_subscribe


host = os.getenv("MQTT_HOST")
port = int(os.getenv("MQTT_PORT"))
keepalive = int(os.getenv("MQTT_KEEPALIVE"))
if client.connect(host, port, keepalive) != 0:
    print("Ha ocurrido un problema al conectar con el broker MQTT")
    sys.exit(1)


try:
    print("Presione CTRL+C para salir...")
    client.loop_forever()
except Exception as e:
    print("Algo malió sal...")
    print(e)
finally:
    print("Desconectando del broker MQTT")
    client.disconnect()

