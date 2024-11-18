import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

export const useUsuarios = () => {
  const axios = useAxios();

  const fetcher = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
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

  const { data, error, isValidating, mutate } = useSWR("/usuarios", fetcher);
  const isForbidden = error?.status === 403;

  return {
    usuarios: data,
    loading: isValidating,
    error: error && !isForbidden ? error.message : null,
    isForbidden,
    refreshUsuarios: mutate,
  };
};
