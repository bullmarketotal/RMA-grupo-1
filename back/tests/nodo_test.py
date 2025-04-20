import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from ..nodos.models import Nodo
from ..main import app
from .db_test import test_client
from ..database import get_db


# Test para obtener un nodo
def test_read_nodo(test_client: TestClient):
    # Crear un nodo de prueba en la base de datos
    db = next(test_client.app.dependency_overrides[get_db]())  # Usamos la base de datos de pruebas
    new_nodo = Nodo(identificador="Nodo de prueba", descripcion="Descripción del nodo de prueba", 
                    porcentajeBateria=50, latitud=10.1, longitud=11.5)
    db.add(new_nodo)
    db.commit()
    db.refresh(new_nodo)

    # Realizar la solicitud GET al endpoint /nodos/{id}
    response = test_client.get(f"/nodos/1")

    # Verificar que la respuesta tenga el código de estado 200 y los datos correctos
    assert response.status_code == 200
    assert response.json()["nombre"] == "Nodo de prueba"
    assert response.json()["descripcion"] == "Descripción del nodo de prueba"


