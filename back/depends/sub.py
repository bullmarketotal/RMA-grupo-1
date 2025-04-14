import sys
import threading
import time
from typing import Callable, Optional

import paho.mqtt.client as paho

from ..depends.config import config


class Subscriptor:
    def __init__(
        self,
        client: paho.Client,
        on_message_callback: Optional[Callable[[str], None]] = None,
    ) -> None:
        self.client = client
        self.message_counter = 0
        self.on_message_callback = on_message_callback
        self.should_exit = False
        self.thread = None
        self.subscribed = False

        self.set_event_handlers()

    def set_event_handlers(self) -> None:
        def on_subscribe(_, userdata, mid, granted_qos) -> None:
            if not self.subscribed:
                print(f"Suscrito a {config.topic}!")
                self.subscribed = True

        def on_message(_, userdata, msg) -> None:
            message = msg.payload.decode()
            self.message_counter += 1
            if self.on_message_callback:
                self.on_message_callback(message)
            else:
                print(f"Mensaje recibido: {message}")

        def on_connect(_, obj, flags, reason_code) -> None:
            if self.client.is_connected():
                print("Suscriptor conectado!")
                if not self.subscribed:
                    self.subscribe(config.topic, 1)

        def on_disconnect(_, userdata, rc) -> None:
            print(f"Total messages received: {self.message_counter}")
            print("Desconectado!")
            self.should_exit = True

        self.client.on_connect = on_connect
        self.client.on_subscribe = on_subscribe
        self.client.on_message = on_message
        self.client.on_disconnect = on_disconnect

    def subscribe(self, topic: str, qos: int) -> None:
        self.client.subscribe(topic=topic, qos=qos)

    def connect(self, host: str, port: int, keepalive: int) -> None:
        try:
            self.client.connect(host, port, keepalive)
            print("Presione CTRL+C para salir...")
            self.thread = threading.Thread(target=self.run_loop, daemon=True)
            self.thread.start()
        except Exception as e:
            print(f"Error al conectar con el broker MQTT: {e}")
            sys.exit(1)

    def run_loop(self) -> None:
        while not self.should_exit:
            self.client.loop()

    def disconnect(self):
        self.client.disconnect()
        self.should_exit = True
        if self.thread and self.thread.is_alive():
            self.thread.join()

    def set_should_exit(self, value: bool) -> None:
        self.should_exit = value
    
