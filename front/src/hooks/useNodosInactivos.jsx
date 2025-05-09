import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const useNodosInactivos = ({cuenca_id}) => {
  const axios = useAxios();

  let endpoint;

  if (cuenca_id){
    endpoint = `/nodosinactivos/${cuenca_id}`;
  }else{
     endpoint = "/nodosinactivos";
  };
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
    nodosInactivos: data ?? [],
    loading: isValidating,
    error,
    mutate,
  };
};
