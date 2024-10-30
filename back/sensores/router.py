from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from back.database import get_db
from back.sensores import models, schemas, services

# import models, schemas, exceptions, services

router = APIRouter()

# Rutas para sensores


@router.get("/sensores", response_model=list[schemas.Sensor])
def read_sensores(db: Session = Depends(get_db)):
    return services.listar_sensores(db)


@router.post("/sensores", response_model=schemas.Sensor)
def create_sensor(sensor: schemas.SensorCreate, db: Session = Depends(get_db)):
    return services.crear_sensor(db, sensor)


@router.get("/sensordata/{id}", response_model=schemas.SensorData)
def read_sensor_with_data(id: int, db: Session = Depends(get_db)):
    return services.sensor_con_datos(id, db)
