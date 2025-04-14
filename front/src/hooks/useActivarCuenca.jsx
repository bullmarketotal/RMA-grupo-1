import { useAxios } from "../context/AxiosProvider";

export const useActivarCuenca = () => {
  const axios = useAxios();

  const activarNodo = async (nodoId) => {
    const response = await axios.put(`cuencas/cuencasinactivas/${nodoId}`);
    return response.data;
  };

  return {
    activarNodo,
  };
};
