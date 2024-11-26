// Importamos useSWR para manejar la carga de datos
import useSWR from "swr";

// Importamos el contexto de Axios que utilizamos para hacer las peticiones HTTP
import { useAxios } from "../context/AxiosProvider";

// Función fetcher para hacer las peticiones HTTP y retornar los datos
const fetcher = async (url, axios) => {
  // Realizamos la petición GET utilizando Axios
  const response = await axios.get(url);
  // Retornamos la data de la respuesta
  return response.data;
};

// Custom Hook useTipos que no recibe parámetros (ya que no es necesario un tipo_id)
export const useTipoDato = () => {
  // Obtenemos el cliente Axios desde el contexto
  const axios = useAxios();

  // Definimos el endpoint para obtener todos los tipos
  const endpoint = "/tipos";
  
  // Usamos useSWR para manejar la solicitud y el estado de los datos
  const { data, error, isValidating } = useSWR(
    // Endpoint de la API que queremos consumir
    endpoint,
    // Función fetcher que maneja la petición
    (url) => fetcher(url, axios),
    {
      // Desactivamos la revalidación al hacer foco en la página
      revalidateOnFocus: false,
      // Número de reintentos en caso de error
      errorRetryCount: 3,
      // Intervalo de tiempo entre reintentos
      errorRetryInterval: 10000,
      // Intervalo de tiempo entre solicitudes repetidas
      dedupingInterval: 60000,
    }
  );

  // Retornamos los tipos de datos, el estado de carga y cualquier error
  return {
    // Devolvemos los tipos de datos, si no hay datos, retornamos un arreglo vacío
    tipos: data ?? [],
    // Indicamos si está en proceso de validación (cargando)
    loading: isValidating,
    // Devolvemos el error si ocurrió algún problema
    error,
  };
};

// Exportamos el hook para usarlo en otros componentes
export default useTipoDato;