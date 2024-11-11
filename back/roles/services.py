from datetime import datetime, timedelta
from typing import List

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from back import exceptions
from back.roles import schemas
from back.roles.models import Role
from back.roles.schemas import RolBase

# operaciones CRUD para roles


def listar_roles(db: Session) -> List[RolBase]:
    return Role.get_all(db)
