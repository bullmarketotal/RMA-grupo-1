import { useAxios } from "../context/AxiosProvider";

const useAsignarRevocarPermiso = () => {
  const axios = useAxios();

  const assignPermisoToRole = async (rolePermisoData) => {
    try {
      const response = await axios.post("/permisosassign", rolePermisoData);
      return response.data;
    } catch (error) {
      console.error("Error assigning permiso:", error);
      throw error;
    }
  };

  const revokePermisoFromRole = async (rolePermisoData) => {
    try {
      const response = await axios.delete("/permisosrevoke", {
        data: rolePermisoData,
      });
      return response.data;
    } catch (error) {
      console.error("Error revoking permiso:", error);
      throw error;
    }
  };

  return { assignPermisoToRole, revokePermisoFromRole };
};

export default useAsignarRevocarPermiso;
