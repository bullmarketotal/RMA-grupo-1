import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  const response = await axios.get(url);
  return response.data;
};

export const useNodos = () => {
  const axios = useAxios();

  const { data, error, isValidating, mutate } = useSWR("/nodos", (url) =>
    fetcher(url, axios)
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
    await axios.delete(`/nodos/${nodoId}`); // Corrige la URL del endpoint
    const updatedNodos = data.filter((nodo) => nodo.id !== nodoId);
    mutate(updatedNodos, false); // Actualiza los datos localmente sin revalidar
    mutate(); // Forzar la revalidación del endpoint "/nodos"
  };

  return {
    nodos: data ?? [],
    loading: isValidating,
    error,
    addNodo,
    updateNodo,
    deleteNodo,
  };
};
