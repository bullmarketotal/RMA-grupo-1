import { useAxios } from "../context/AxiosProvider";

const useAsignarRevocarRol = () => {
  const axios = useAxios();

  const assignRoleToUsuario = async (usuarioRoleData) => {
    try {
      const response = await axios.post("/rolesassign", usuarioRoleData);
      return response.data;
    } catch (error) {
      console.error("Error assigning role:", error);
      throw error;
    }
  };

  const revokeRoleFromUsuario = async (usuarioRoleData) => {
    try {
      const response = await axios.delete("/rolesrevoke", {
        data: usuarioRoleData,
      });
      return response.data;
    } catch (error) {
      console.error("Error revoking role:", error);
      throw error;
    }
  };

  return { assignRoleToUsuario, revokeRoleFromUsuario };
};

export default useAsignarRevocarRol;
