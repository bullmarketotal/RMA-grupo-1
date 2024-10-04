from typing import List
from sqlalchemy.orm import Session
from back.sensores.models import Sensor
from back import exceptions
from back.sensores import schemas

# operaciones CRUD para Sensores


def crear_sensor(db: Session, sensor: schemas.SensorCreate) -> Sensor:
    return Sensor.create(db, sensor)


def listar_sensores(db: Session) -> List[Sensor]:
    return Sensor.get_all(db)
