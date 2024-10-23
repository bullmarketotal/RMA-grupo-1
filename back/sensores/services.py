from typing import List

from sqlalchemy.orm import Session

from back import exceptions
from back.sensores import schemas
from back.sensores.models import Sensor
from back.sensores.schemas import SensorData
from datetime import datetime

# operaciones CRUD para Sensores


def crear_sensor(db: Session, sensor: schemas.SensorCreate) -> Sensor:
    return Sensor.create(db, sensor)


def listar_sensores(db: Session) -> List[Sensor]:
    return Sensor.get_all(db)

def sensor_con_datos(id: int, db: Session) -> SensorData:
    return {
        "sensor": {
            "id": 1,
            "identificador":"test",
            "latitud": -38.323,
            "longitud": -64.38923,
            "porcentajeBateria": 29
        },
        "data": [ {"temperatura": 23.2, "nivel_hidrometrico": 2.1, "date": datetime.now()} ]
    }
