import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const useNodos = ({ nodo_id, cuenca_id } = {}) => {
  const axios = useAxios();
  

  // Determinar el endpoint según si se pasa cuenca_id o nodo_id
  let endpoint = "/nodos";
  if (nodo_id) {
    endpoint = `/nodos/${nodo_id}`;
  } else if (cuenca_id) {
    endpoint = `/nodos?cuenca_id=${cuenca_id}`;  // Modificado para filtrar por cuencaId
  }
  

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

  const addNodo = async (nodo) => {
    await axios.post("/nodos", nodo);
    mutate();
  };

  const updateNodo = async (nodoId, nodo) => {
    await axios.put(`/nodos/${nodoId}`, nodo);
    mutate();
  };

  const deleteNodo = async (nodoId) => {
    await axios.delete(`/nodos/${nodoId}`);
    mutate();
  };

  return {
    nodos: data ?? [],
    loading: isValidating,
    error,
    addNodo,
    updateNodo,
    deleteNodo,
    refresh: mutate,
  };
};

export default useNodos;
