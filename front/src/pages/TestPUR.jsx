import React from "react";
import useUsuariosRoles from "../hooks/useUsuariosRoles";

const UsuariosRolesComponent = () => {
  const { usuariosRoles, loading, error } = useUsuariosRoles();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;
  console.log(usuariosRoles);
  return (
    <div>
      <h2>Usuarios y sus Roles</h2>
      <ul>
        {usuariosRoles.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.username}</strong>
            <ul>
              {usuario.roles.map((role) => (
                <li key={role.id}>{role.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosRolesComponent;
