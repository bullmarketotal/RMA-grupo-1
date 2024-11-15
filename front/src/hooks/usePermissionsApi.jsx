import { useState, useCallback } from "react";
import axios from "../api/axios";

const useAssignPermiso = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const assignPermiso = async (rolePermisoData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/permisosassign", rolePermisoData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data || "Error al asignar el permiso");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { assignPermiso, loading, error, success };
};

const usePermissions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const getPermissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/permisos");
      setPermissions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los permisos");
      console.error("Error al obtener los permisos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { permissions, loading, error, getPermissions };
};

export { usePermissions, useAssignPermiso };
