from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import select

from back import exceptions
from back.sensores import schemas
from back.sensores.models import Sensor
from back.sensores.schemas import SensorData
from back.paquete.models import Paquete
from datetime import datetime
from fastapi import HTTPException

# operaciones CRUD para Sensores


def crear_sensor(db: Session, sensor: schemas.SensorCreate) -> Sensor:
    return Sensor.create(db, sensor)


def listar_sensores(db: Session) -> List[Sensor]:
    return Sensor.get_all(db)

def sensor_con_datos(nodo_id: int, db: Session) -> SensorData:

    # Info sensor
    nodo_query = select(Sensor).where(Sensor.id == nodo_id)
    nodo = db.execute(nodo_query).scalars().first()

    print(nodo)

    if not nodo:
        raise HTTPException(status_code=404, detail={message: "Nodo no encontrado", id: nodo_id})
    

    # Mediciones
    data_query = db.query(Paquete)

    data_query = data_query.filter(Paquete.sensor_id == nodo_id)
    data = data_query.all()

    return {
        "sensor": {
            "identificador": nodo.identificador,
            "porcentajeBateria": 50,
            "latitud": nodo.latitud,
            "longitud": nodo.longitud,
            "id": nodo.id
        },
        "data": data
    }
