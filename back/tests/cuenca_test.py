from sqlalchemy import inspect
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from ..cuencas.models import Cuenca
from ..main import app
from .db_test import test_client
from ..database import get_db
from .db_test import engine


# Test para obtener una cuenca
def test_read_cuenca(test_client: TestClient):
    # Crear una cuenca de prueba en la base de datos
    db = next(test_client.app.dependency_overrides[get_db]())  # Usamos la base de datos de pruebas
   ## print(test_client.app.dependency_overrides[get_db])
    new_cuenca = Cuenca(nombre="Cuenca de prueba", descripcion="Descripción de la cuenca de prueba")
    db.add(new_cuenca)
    db.commit()
    db.refresh(new_cuenca)
    ##cuencas_registradas = db.query(Cuenca).all()
    ##print("Cantidad de cuencas:",cuencas_registradas)  # Esto debería mostrar una lista de objetos Cuenca
    ##print(inspect(engine).get_table_names()) 
    # Realizar la solicitud GET al endpoint 
    response = test_client.get(f"/cuencas/1")
    # Verificar que la respuesta tenga el código de estado 200 y los datos correctos
    assert response.status_code == 200
    assert response.json()["nombre"] == "Cuenca de prueba"
    assert response.json()["descripcion"] == "Descripción de la cuenca de prueba"

def test_read_cuenca_inactiva(test_client: TestClient):
    db= next(test_client.app.dependency_overrides[get_db])