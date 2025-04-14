import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const useCuencasInactivas = () => {
    
  const axios = useAxios();

  const endpoint = "cuencas/cuencasinactivas";
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
    cuencasInactivas: data ?? [],
    loading: isValidating,
    error,
    mutate,
  };
};
