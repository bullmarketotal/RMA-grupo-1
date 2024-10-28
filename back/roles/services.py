from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import select

from back import exceptions
from back.roles import schemas
from back.roles.models import Rol
from back.roles.schemas import RolBase
from datetime import datetime, timedelta
from fastapi import HTTPException

# operaciones CRUD para roles

def listar_roles(db: Session) -> List[RolBase]:
    return Rol.get_all(db)