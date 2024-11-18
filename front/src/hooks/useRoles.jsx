import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  if (!axios) {
    throw new Error("Axios en el fetcher");
  }
  const response = await axios.get(url);
  return response.data;
};

export const useRoles = () => {
  const axios = useAxios();

  if (!axios) {
    throw new Error("Axios en useRoles");
  }

  const { data, error, isValidating, mutate } = useSWR("/roles", (url) =>
    fetcher(url, axios)
  );
  const isForbidden = error?.response?.status === 403;

  const addRole = async (role) => {
    try {
      await axios.post("/roles", role);
      mutate();
    } catch (err) {
      if (err.response?.status === 403) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      } else {
        throw err;
      }
    }
  };

  const updateRole = async (roleId, role) => {
    try {
      await axios.put(`/roles/${roleId}`, role);
      mutate();
    } catch (err) {
      if (err.response?.status === 403) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      } else {
        throw err;
      }
    }
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`/roles/${roleId}`);
      mutate();
    } catch (err) {
      if (err.response?.status === 403) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      } else {
        throw err;
      }
    }
  };

  return {
    roles: data ?? [],
    loading: isValidating,
    error,
    isForbidden,
    addRole,
    updateRole,
    deleteRole,
  };
};
