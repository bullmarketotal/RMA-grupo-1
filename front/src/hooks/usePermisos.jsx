import useSWR, { mutate } from "swr";
import { useAxios } from "../context/AxiosProvider";
import { useState } from "react";

const fetcher = async (url) => {
  const axios = useAxios();
  const response = await axios.get(url);
  return response.data;
};

export const usePermissions = () => {
  const { data, error, isValidating } = useSWR("/permisos", fetcher);

  return {
    permissions: data ?? [],
    loading: isValidating,
    error,
    refreshPermissions: () => mutate("/permisos"),
  };
};

export const useAssignPermiso = () => {
  const axios = useAxios();
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
      mutate("/permisos_role");
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

export const useRevokePermiso = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const revokePermiso = async (rolePermisoData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/permisosrevoke", rolePermisoData);
      setSuccess(true);
      mutate("/permisos_role");
      return response.data;
    } catch (err) {
      setError(err.response?.data || "Error al revocar el permiso");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { revokePermiso, loading, error, success };
};

export const useRoleWithPermissions = (roleId) => {
  const axios = useAxios();

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isValidating } = useSWR(
    roleId ? `/roles/${roleId}` : null,
    fetcher
  );

  return {
    role: data ?? null,
    loading: isValidating,
    error,
  };
};
