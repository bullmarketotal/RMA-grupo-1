import React, { useState, useEffect } from "react";
import { useAssignPermiso } from "../hooks/usePermissionsApi";
import { useRoles } from "../hooks/useRolesApi";
import { usePermissions } from "../hooks/usePermissionsApi";

const AsignarPermiso = () => {
  const { assignPermiso, loading, error, success } = useAssignPermiso();
  const { roles, loading: loadingRoles, error: errorRoles } = useRoles();
  const {
    permissions,
    loading: loadingPermissions,
    error: errorPermissions,
  } = usePermissions();
  const [roleId, setRoleId] = useState("");
  const [permisoId, setPermisoId] = useState("");

  const handleAssign = async () => {
    try {
      await assignPermiso({
        role_id: parseInt(roleId),
        permiso_id: parseInt(permisoId),
      });
    } catch (err) {
      console.error("Error asignando permiso:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Asignar Permiso a Rol</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Selecciona un Rol</label>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="border rounded p-2 w-full"
          disabled={loadingRoles}
        >
          <option value="">-- Selecciona un Rol --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name} (ID: {role.id})
            </option>
          ))}
        </select>
        {errorRoles && <p className="text-red-500 mt-2">{errorRoles}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Selecciona un Permiso
        </label>
        <select
          value={permisoId}
          onChange={(e) => setPermisoId(e.target.value)}
          className="border rounded p-2 w-full"
          disabled={loadingPermissions}
        >
          <option value="">-- Selecciona un Permiso --</option>
          {permissions.map((permiso) => (
            <option key={permiso.id} value={permiso.id}>
              {permiso.identificador} (ID: {permiso.id})
            </option>
          ))}
        </select>
        {errorPermissions && (
          <p className="text-red-500 mt-2">{errorPermissions}</p>
        )}
      </div>
      <button
        onClick={handleAssign}
        className="bg-sky-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
        disabled={loading || !roleId || !permisoId}
      >
        {loading ? "Asignando..." : "Asignar Permiso"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Permiso asignado correctamente.</p>
      )}
    </div>
  );
};

export default AsignarPermiso;
