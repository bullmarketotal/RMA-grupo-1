import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const usePermisos = ({ permiso_id } = {}) => {
  const axios = useAxios();

  const endpoint = permiso_id ? `/permisos/${permiso_id}` : "/permisos";
  const { data, error, isValidating, mutate } = useSWR(
    endpoint,
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  return {
    permisos: data ?? [],
    loading: isValidating,
    error,
    mutate,
  };
};

export default usePermisos;
