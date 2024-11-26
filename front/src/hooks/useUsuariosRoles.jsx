import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

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
