import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ...main import app
from ...database import get_db
from ..models import Paquete
from ...models import ModeloBase


# TODO base de datos para el test no se si está bien así
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
ModeloBase.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(scope="module")
def test_db():
    ModeloBase.metadata.create_all(bind=engine)
    yield TestingSessionLocal()
    ModeloBase.metadata.drop_all(bind=engine)


def test_read_paquetes(test_db):

    paquete = Paquete(nodo_id=1, data=10.0, date="2024-11-17T23:43:07.261Z", type_id=1)
    test_db.add(paquete)
    test_db.commit()
    test_db.refresh(paquete)

    response = client.get("/paquetes")

    assert response.status_code == 200
    assert response.json()["info"]["total_items"] == 1
    assert response.json()["items"][0]["data"] == 10.0
    assert response.json()["items"][0]["nodo_id"] == 1
    assert response.json()["items"][0]["type_id"] == 1
