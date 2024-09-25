from typing import List
from sqlalchemy.orm import Session
from src.sensores.models import Sensor, Ubicacion
from src import exceptions
from src.sensores import schemas

# operaciones CRUD para Personas


def crear_sensor(db: Session, sensor: schemas.SensorCreate) -> Sensor:
    return Sensor.create(db, identificador=sensor.identificador, ubicacion=sensor.ubicicaion)


def listar_sensores(db: Session) -> List[Sensor]:
    return Sensor.get_all(db)
