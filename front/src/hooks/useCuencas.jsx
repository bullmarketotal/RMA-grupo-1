import useSWR from "swr";
import { useAxios } from "../context/AxiosProvider";
import { fetcher } from "../utils";

export const useCuencas = ({ nodo_id, cuenca_id } = {}) => {
  const axios = useAxios();
  

  // Determinar el endpoint según si se pasa cuenca_id o nodo_id
  let endpoint = "/cuencas";
  if (cuenca_id) {
    endpoint = `/cuencas/${cuenca_id}`;
  } 
 /* else if (nodo_id) {

    endpoint = `/nodos?cuenca_id=${cuenca_id}`;  // Modificado para filtrar por cuencaId

  }*/  //consultar esto, de todas formas habria que reepenzar los endpoints xd
  

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

  const addCuenca = async (cuenca) => {
    await axios.post("/cuencas", cuenca);
    mutate();
  };

  const updateCuenca = async (cuenca_id, cuenca) => {
    await axios.put(`/cuencas/${cuenca_id}`, cuenca);
    mutate();
  };

  const deleteCuenca = async (cuenca_id) => {
    await axios.delete(`/cuencas/${cuenca_id}`);
    mutate();
  };

  return {
    cuencas: data ?? [],
    loading: isValidating,
    error,
    addCuenca,
    updateCuenca,
    deleteCuenca,
    refresh: mutate,
  };
};

export default useCuencas;
