import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};

export const useNodos = ({
  enableAdd = false,
  enableUpdate = false,
  enableDelete = false,
} = {}) => {
  const axios = useAxios();

  const { data, error, isValidating, mutate } = useSWR(
    "/nodos",
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  const addNodo = enableAdd
    ? async (nodo) => {
        await axios.post("/nodos", nodo);
        mutate();
      }
    : undefined;

  const updateNodo = enableUpdate
    ? async (nodoId, nodo) => {
        await axios.put(`/nodos/${nodoId}`, nodo);
        mutate();
      }
    : undefined;

  const deleteNodo = enableDelete
    ? async (nodoId) => {
        await axios.delete(`/nodos/${nodoId}`);
        mutate();
      }
    : undefined;

  return {
    nodos: data ?? [],
    loading: isValidating,
    error,
    addNodo,
    updateNodo,
    deleteNodo,
  };
};
export default useNodos;
