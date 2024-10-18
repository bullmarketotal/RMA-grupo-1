from typing import List

from sqlalchemy.orm import Session

from back import exceptions
from back.usuarios import schemas
from back.usuarios.models import Usuario

# operaciones CRUD para Usuarios


def crear_usuario(db: Session, usuario: schemas.UsuarioCreate) -> Usuario:
    return Usuario.create(db, usuario)


def listar_usuarios(db: Session) -> List[Usuario]:
    return Usuario.get_all(db)
