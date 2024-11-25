import React, { useState } from "react";
import { useRoles } from "../hooks/useRoles";

const RolesComponent = () => {
  const { roles, loading, error, addRole, updateRole, deleteRole } = useRoles();
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [editRole, setEditRole] = useState(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  const handleAddRole = () => {
    addRole(newRole);
    setNewRole({ name: "", description: "" });
  };

  const handleUpdateRole = (roleId) => {
    updateRole(roleId, editRole);
    setEditRole(null);
  };

  return (
    <div>
      <h1>Lista de Roles</h1>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.id} - {role.name} - {role.description}
            <button onClick={() => setEditRole(role)}>Editar</button>
            <button onClick={() => deleteRole(role.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nombre del Rol"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newRole.description}
          onChange={(e) =>
            setNewRole({ ...newRole, description: e.target.value })
          }
        />
        <button onClick={handleAddRole}>Agregar Rol</button>
      </div>
      {editRole && (
        <div>
          <input
            type="text"
            value={editRole.name}
            onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
          />
          <input
            type="text"
            value={editRole.description}
            onChange={(e) =>
              setEditRole({ ...editRole, description: e.target.value })
            }
          />
          <button onClick={() => handleUpdateRole(editRole.id)}>
            Actualizar Rol
          </button>
        </div>
      )}
    </div>
  );
};

export default RolesComponent;
