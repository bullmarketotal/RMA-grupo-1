import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};

export const useNodos = ({
  nodo_id,
  enableAdd = false,
  enableUpdate = false,
  enableDelete = false,
} = {}) => {
  const axios = useAxios();

  // Cambiar endpoint según si id está definido o no
  const endpoint = nodo_id ? `/nodos/${nodo_id}` : "/nodos";

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
