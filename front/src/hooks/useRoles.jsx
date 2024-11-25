import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};
export const useRoles = ({ role_id } = {}) => {
  const axios = useAxios();
  const endpoint = role_id ? `/roles/${role_id}` : "/roles";
  const { data, error, isValidating, mutate } = useSWR(
    endpoint,
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: true,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  const addRole = async (role) => {
    try {
      await axios.post("/roles", role);
      mutate();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const updateRole = async (roleId, role) => {
    try {
      await axios.put(`/roles/${roleId}`, role);
      mutate();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`/roles/${roleId}`);
      mutate();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return {
    roles: data ?? [],
    loading: isValidating,
    error,
    addRole,
    updateRole,
    deleteRole,
  };
};

export default useRoles;
