import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const useUsuarios = ({ usuario_id } = {}) => {
  const axios = useAxios();

  const endpoint = usuario_id ? `/usuarios/${usuario_id}` : "/usuarios";
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

  return {
    data,
    error,
    isValidating,
    mutate,
  };
};

export default useUsuarios;
