import { useEffect, useState } from "react";
import { useAxios } from "../context/AxiosProvider";
const baseURL = import.meta.env.VITE_API_URL

const useColorBasedOnAlert = (nodo) => {
  const axios = useAxios()
  const [lastNivel, setLastNivel] = useState(null)
  const [loadingColor, setLoadingColor] = useState(true)
  const [config, setConfig] = useState(null);

  useEffect(() => {
    axios.get(baseURL + "/paquetes", {
      params: {
        limit: 1,
        nodo_id: nodo.id,
        order_by: "date",
        type: 25,
        order: "desc"
      }
    })
    .then(res => {
      setLastNivel(res.data.items[0])
      return axios.get(baseURL + "/config")
    })
    .then(res => {
      setConfig(res.data)
      setLoadingColor(false)
    })
    .catch(e => console.error("Error creando marker: ", e))

  }, [])

  if(loadingColor)
    return {alertColor: "gray-400", loadingColor: true, lastNivel}


  if(!lastNivel)
    return {alertColor: "gray-500", loading: false, lastNivel};
  if(lastNivel?.data < config?.nivel_hidrometrico_alertas?.amarilla)
      return {alertColor: "sky-500", loading: false, lastNivel};
  if(lastNivel?.data < config?.nivel_hidrometrico_alertas?.naranja)
      return {alertColor: "yellow-500", loading: false, lastNivel};
  if(lastNivel?.data < config?.nivel_hidrometrico_alertas?.roja)
    return {alertColor: "orange-500", loading: false, lastNivel};
  else
    return {alertColor: "red-500", loading: false, lastNivel};
};

export default useColorBasedOnAlert;
