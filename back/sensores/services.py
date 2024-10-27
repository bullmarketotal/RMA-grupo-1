from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import select

from back import exceptions
from back.sensores import schemas
from back.sensores.models import Sensor
from back.sensores.schemas import SensorData
from back.paquete.models import Paquete
from datetime import datetime, timedelta
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

    if not nodo:
        raise HTTPException(status_code=404, detail="Nodo no encontrado")
    

    # Mediciones
    data_query = db.query(Paquete)
    fecha_limite = datetime.now() - timedelta(days=7)

    data_query = data_query.filter(Paquete.sensor_id == nodo_id, Paquete.date >= fecha_limite)
    print(data_query)
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
