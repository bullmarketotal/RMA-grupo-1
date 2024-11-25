import React, { useState } from "react";
import useAsignarRevocarRoles from "../hooks/useAsignarRevocarRol";

const RolesManagementComponent = () => {
  const { assignRoleToUsuario, revokeRoleFromUsuario } =
    useAsignarRevocarRoles();
  const [usuarioRoleData, setUsuarioRoleData] = useState({
    usuario_id: "",
    role_id: "",
  });

  const handleAssignRole = async () => {
    try {
      await assignRoleToUsuario(usuarioRoleData);
      console.log("Role assigned successfully");
    } catch (error) {
      console.error("Failed to assign role", error);
    }
  };

  const handleRevokeRole = async () => {
    try {
      await revokeRoleFromUsuario(usuarioRoleData);
      console.log("Role revoked successfully");
    } catch (error) {
      console.error("Failed to revoke role", error);
    }
  };

  return (
    <div>
      <h2>Asignar o Revocar Roles</h2>
      <div>
        <input
          type="text"
          placeholder="ID del Usuario"
          value={usuarioRoleData.usuario_id}
          onChange={(e) =>
            setUsuarioRoleData({
              ...usuarioRoleData,
              usuario_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="ID del Rol"
          value={usuarioRoleData.role_id}
          onChange={(e) =>
            setUsuarioRoleData({ ...usuarioRoleData, role_id: e.target.value })
          }
        />
        <button onClick={handleAssignRole}>Asignar Rol</button>
        <button onClick={handleRevokeRole}>Revocar Rol</button>
      </div>
    </div>
  );
};

export default RolesManagementComponent;
