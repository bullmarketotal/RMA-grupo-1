from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from .database import get_db
from .nodos.models import Nodo
from .nodos.schemas import NodoCreate
from .permisos.schemas import PermisoCreate, RolePermisoCreate
from .permisos.services import create_permiso
from .roles.models import Role
from .roles.schemas import RoleCreate
from .roles.services import create_role
from .permisos.services import assign_permiso_to_role
from .permisos.models import Permiso
from .auth.services import crear_usuario
from .usuarios.models import Usuario
from .usuarios.schemas import Usuario as UsuarioSchema
from .usuarios.schemas import UsuarioCreate
from .roles.services import assign_role_to_usuario
from .usuarios.services import get_user_by_username
from .roles.schemas import UsuarioRole


def init_permisos():
    db: Session = next(get_db())
    permisos_data = [
        PermisoCreate(
            identificador="read_permiso", descripcion="Leer detalles de permisos"
        ),
        PermisoCreate(
            identificador="list_permisos", descripcion="Listar todos los permisos"
        ),
        PermisoCreate(
            identificador="read_rolepermisos", descripcion="Ver permisos-roles"
        ),
        PermisoCreate(
            identificador="assign_permiso", descripcion="Asignar permiso a rol"
        ),
        PermisoCreate(
            identificador="revoke_permiso", descripcion="Revocar permiso de rol"
        ),
        PermisoCreate(identificador="read_nodos", descripcion="Leer nodos"),
        PermisoCreate(identificador="create_nodo", descripcion="Crear nodo"),
        PermisoCreate(
            identificador="read_nodo", descripcion="Leer detalles de un nodo"
        ),
        PermisoCreate(identificador="update_nodo", descripcion="Actualizar nodo"),
        PermisoCreate(identificador="delete_nodo", descripcion="Eliminar nodo"),
        PermisoCreate(
            identificador="read_nodo_paquetes", descripcion="Leer paquetes de un nodo"
        ),
        PermisoCreate(identificador="read_paquetes", descripcion="Leer paquetes"),
        PermisoCreate(identificador="read_usuarios", descripcion="Leer usuarios"),
        PermisoCreate(
            identificador="read_protected", descripcion="Leer datos protegidos"
        ),
        PermisoCreate(
            identificador="read_roles_seguros", descripcion="Obtener roles seguros"
        ),
        PermisoCreate(identificador="read_roles", descripcion="Leer roles"),
        PermisoCreate(identificador="create_role", descripcion="Crear rol"),
        PermisoCreate(identificador="read_role", descripcion="Leer detalles de un rol"),
        PermisoCreate(identificador="update_role", descripcion="Actualizar rol"),
        PermisoCreate(identificador="delete_role", descripcion="Eliminar rol"),
        PermisoCreate(identificador="assign_role", descripcion="Asignar rol a usuario"),
        PermisoCreate(
            identificador="revoke_role", descripcion="Revocar rol de usuario"
        ),
        PermisoCreate(
            identificador="read_usuarios_roles", descripcion="Leer usuarios con roles"
        ),
        PermisoCreate(identificador="admin", descripcion="Administrador"),
    ]
    for permiso_data in permisos_data:
        try:
            create_permiso(db, permiso_data)
        except IntegrityError:
            db.rollback()
            print(f"El permiso '{permiso_data.identificador}' ya existe.")
    db.commit()
    db.close()
    print("Permisos creados exitosamente.")


def init_nodos():
    db: Session = next(get_db())
    nodos_data = [
        NodoCreate(
            identificador="Legolas",
            porcentajeBateria=100,
            latitud=-34.6037,
            longitud=-58.3816,
            descripcion="Descripción del Nodo 1",
        ),
        NodoCreate(
            identificador="Gandalf",
            porcentajeBateria=100,
            latitud=-34.6038,
            longitud=-58.3817,
            descripcion="Descripción del Nodo 2",
        ),
        NodoCreate(
            identificador="Aragorn",
            porcentajeBateria=100,
            latitud=-34.6039,
            longitud=-58.3818,
            descripcion="Descripción del Nodo 3",
        ),
    ]
    for nodo_data in nodos_data:
        try:
            nodo = Nodo.create(db, nodo_data)
            db.add(nodo)
        except IntegrityError:
            db.rollback()
            print(f"El nodo '{nodo_data.identificador}' ya existe.")
    db.commit()
    db.close()
    print("Nodos creados exitosamente.")


def init_roles():
    db: Session = next(get_db())
    admin_role_data = RoleCreate(
        name="admin", description="Administrador con todos los permisos"
    )
    try:
        admin_role = create_role(db, admin_role_data)
        print(f"rol admin creado exitosamente")
    except IntegrityError:
        db.rollback()
        print(f"Rol 'admin' ya existe.")
    permisos = db.query(Permiso).all()
    admin_role = db.query(Role).filter(Role.name == "admin").first()
    for permiso in permisos:
        role_permiso_data = RolePermisoCreate(
            role_id=admin_role.id, permiso_id=permiso.id
        )
        try:
            assign_permiso_to_role(db, role_permiso_data)
            print("Permiso asignados exitosamente.")
        except IntegrityError:
            db.rollback()
            print(f"Permiso '{permiso.identificador}' ya está asignado al rol 'admin'.")
        except HTTPException as e:
            print(
                f"El permiso '{permiso.identificador}' ya está asignado al rol 'admin'. Detalle: {e.detail}"
            )
    db.commit()
    db.close()


def init_user():
    db: Session = next(get_db())
    usuario = UsuarioCreate(username="admin", password="123")

    try:
        existing_user = db.query(Usuario).filter(Usuario.username == "admin").first()
        if existing_user:
            print("Usuario 'admin' ya existe.")
        else:
            crear_usuario(db, usuario)
            print("Usuario 'admin' creado con éxito.")
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        user = get_user_by_username(db, "admin")
        usuariorole = UsuarioRole(usuario_id=user.id, role_id=admin_role.id)

        try:
            assign_role_to_usuario(db, usuariorole)
            print("Rol asignado al 'admin'")
        except IntegrityError:
            db.rollback()
            print("El rol ya está asignado al 'admin'")
        except HTTPException:
            db.rollback()
            print("El rol ya está asignado al 'admin'")
    except IntegrityError as e:
        db.rollback()
        print(f"Error al inicializar el usuario: {e}")
    finally:
        db.close()


def init_db():
    init_permisos()
    init_roles()
    init_nodos()
    init_user()


if __name__ == "__main__":
    init_db()
