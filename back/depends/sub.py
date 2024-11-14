import signal
import sys
import threading
import time
from dataclasses import dataclass
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
        self.should_exit = False  # flag para manejar la interrupción
        self.thread = None
        self.subscribed = False  # flag para que no haya multiples subscripciones

        self.set_event_handlers()

    def set_event_handlers(self) -> None:
        def on_subscribe(_, userdata, mid, granted_qos) -> None:
            if not self.subscribed:
                print(f"suscrito a {config.topic}!")
                self.subscribed = True

        def on_message(_, userdata, msg) -> None:
            message = msg.payload.decode()
            self.message_counter += 1
            if self.on_message_callback:
                self.on_message_callback(message)
            else:
                self.client.logger.warning(message)

        def on_connect(_, obj, flags, reason_code) -> None:
            if self.client.is_connected():
                print("Suscriptor conectado!")
                if not self.subscribed:
                    self.subscribe(config.topic, 1)

        def on_disconnect(_, userdata, rc) -> None:
            print(f"total messages received: {self.message_counter}")
            print("disconnected!")
            self.should_exit = True

        self.client.max_queued_messages_set(0)
        self.client.enable_logger()
        self.client.on_connect = on_connect
        self.client.on_subscribe = on_subscribe
        self.client.on_message = on_message
        self.client.on_disconnect = on_disconnect

    def subscribe(self, topic: str, qos: int) -> None:
        self.client.subscribe(topic=topic, qos=qos)

    def connect(self, host: str, port: int, keepalive: int) -> None:

        if self.client.connect(host, port, keepalive) != 0:
            print("Ha ocurrido un problema al conectar con el broker MQTT")
            sys.exit(1)

        print("Presione CTRL+C para salir...")

        self.thread = threading.Thread(target=self.run_loop, daemon=True)
        self.thread.start()

    def run_loop(self) -> None:
        try:
            while not self.should_exit:  # Continuar hasta que el flag cambie
                self.client.loop()
        except KeyboardInterrupt:
            print("Interrupción de teclado detectada (CTRL+C).")
        finally:
            print("Desconectando del broker MQTT")
            self.disconnect()

    def disconnect(self):
        self.client.disconnect()
