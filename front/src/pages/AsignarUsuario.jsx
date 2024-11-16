import React, { useState, useEffect } from "react";
import { useRoleAssign } from "../hooks/useRolesApi";
import { useUsuarios } from "../hooks/useUsuarios";
import { useRoles } from "../hooks/useRolesApi";

const AsignarRol = () => {
  const { assignRole, loading, error, success } = useRoleAssign();
  const { usuarios, loading: loadingUsuarios } = useUsuarios();
  const [roleId, setRoleId] = useState("");
  const [userId, setUserId] = useState("");
  const { roles, loading: loadingRoles } = useRoles();

  const handleAssign = async () => {
    try {
      await assignRole({
        usuario_id: parseInt(userId),
        role_id: parseInt(roleId),
      });
    } catch (err) {
      console.error("Error asignando permiso:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Asignar Rol a Usuario</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Selecciona Usuario</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border rounded p-2 w-full"
          disabled={loadingUsuarios}
        >
          <option value="">-- Selecciona un Usuario --</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.username} (ID: {usuario.id})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Selecciona Rol</label>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="border rounded p-2 w-full"
          disabled={loadingRoles}
        >
          <option value="">-- Selecciona un Rol --</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.name} (ID: {rol.id})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAssign}
        className="bg-sky-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
        disabled={loading || !userId || !roleId}
      >
        {loading ? "Asignando..." : "Asignar Rol"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Rol asignado correctamente.</p>
      )}
    </div>
  );
};

export default AsignarRol;
