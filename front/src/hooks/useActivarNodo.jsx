import { useAxios } from "../context/AxiosProvider";

export const useActivarNodo = () => {
  const axios = useAxios();

  const activarNodo = async (nodoId) => {
    const response = await axios.put(`/nodosinactivos/${nodoId}`);
    return response.data;
  };

  return {
    activarNodo,
  };
};
