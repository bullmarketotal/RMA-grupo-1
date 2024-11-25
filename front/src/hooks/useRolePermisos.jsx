import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};

export const useRolePermisos = () => {
  const axios = useAxios();

  const { data, error, isValidating, mutate } = useSWR(
    "/permisos_role",
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  return {
    rolePermisos: data ?? [],
    loading: isValidating,
    error,
    mutate,
  };
};

export default useRolePermisos;
