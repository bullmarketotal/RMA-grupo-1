import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};

export const useUsuariosRoles = () => {
  const axios = useAxios();

  const { data, error, isValidating, mutate } = useSWR(
    "/usuarios_roles",
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: true,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  return {
    usuariosRoles: data ?? [],
    loading: isValidating,
    error,
    mutate,
  };
};

export default useUsuariosRoles;
