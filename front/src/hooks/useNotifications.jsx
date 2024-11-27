import { useState, useEffect } from "react"
import { useAxios } from "../context/AxiosProvider"
const baseURL = import.meta.env.VITE_API_URL

export const useNotifications = ({ count_limit, shouldReload }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unreadPresent, setUnreadPresent] = useState(false);
  
    const axios = useAxios();
  
    useEffect(() => {
      setLoading(true); // Opcional: reiniciar el loading cada vez que se recargan las notificaciones.
      axios
        .get(baseURL + "/usernotifications", {
          params: { count_limit },
        })
        .then((res) => {
          setNotificaciones(res.data);
          setLoading(false);
          setUnreadPresent(res.data.some((noti) => !noti.is_read));
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }, [count_limit, shouldReload]); // Agregar shouldReload como dependencia
  
    return { notificaciones, loadingNotifications: loading, error, unreadPresent };
  };
  