import React, { useState } from "react";
import { useAssignPermiso } from "../hooks/usePermissionsApi";

const AsignarPermiso = () => {
  const { assignPermiso, loading, error, success } = useAssignPermiso();
  const [roleId, setRoleId] = useState("");
  const [permisoId, setPermisoId] = useState("");

  const handleAssign = async () => {
    try {
      await assignPermiso({
        role_id: parseInt(roleId),
        permiso_id: parseInt(permisoId),
      });
      alert("Permiso asignado con éxito");
    } catch (err) {
      console.error("Error asignando permiso:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Asignar Permiso</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Role ID</label>
        <input
          type="number"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Permiso ID</label>
        <input
          type="number"
          value={permisoId}
          onChange={(e) => setPermisoId(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleAssign}
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
        disabled={loading}
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
