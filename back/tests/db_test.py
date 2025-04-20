##arhivvo: db_test
from sqlalchemy import inspect
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..database import get_db
from ..main import app
from ..models import Base

# Configuración base de datos en memoria para tests
##SQLALCHEMY_TEST_URL = "sqlite:///:memory:"
SQLALCHEMY_TEST_URL = "sqlite:///test.db"
engine = create_engine(SQLALCHEMY_TEST_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Fixture para cliente de test y base en memoria
@pytest.fixture(scope="function")
def test_client():
    # Sobrescribir get_db para usar sesión de test
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    # Crear tablas antes de cada test
    Base.metadata.create_all(bind=engine)
    ##print(inspect(engine).get_table_names()) --esto imprime las tablas de la base 
    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)

    yield client  # Aquí ocurre el test

    # Eliminar tablas después del test
    Base.metadata.drop_all(bind=engine)
