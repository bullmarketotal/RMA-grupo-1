import SwitchButton from "../atoms/SwitchButton";
import { urlBase64ToUint8Array } from "../utils/notifications";
import { useAxios } from "../../context/AxiosProvider";
import { useNotification } from "../../context/NotificationContext";

const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';
const baseURL = import.meta.env.VITE_API_URL

function AlertaSubber({ title, description, value, isInitiallySubbed }) {

    const axios = useAxios();

    const { showNotification } = useNotification();

    async function suscribirUsuario(alerta_id) {
        try{
            if ('serviceWorker' in navigator) {
                // Se inyecta el service worker al navegador del usuario
                const registration = await navigator.serviceWorker.register('./service_worker.js');
        
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
                
                const requestBody = {
                    subscription,
                    alerta_id: alerta_id
                }
                // Enviar la suscripción al backend para almacenarla
        
                const response = await axios.post(baseURL + '/subscribe', requestBody);
        
                showNotification(response.data.message, "success");
            }
        } catch(e) {
            showNotification("Error al suscribirse", "error");
        }
    }

    async function desuscribirUsuario(alerta_id) {
        try {
            const response = await axios.delete(baseURL + '/unsubscribe', { params: { alerta_id }})
            showNotification(response.data.message, "success");
        } catch (e) {
            showNotification("Error al suscribirse", "error");
        }
    }

    function onChange(event) {
        if(event.target.checked)
            suscribirUsuario(event.target.value)
        else
            desuscribirUsuario(event.target.value)
    }

  return (
    <div className="sm:ms-10 w-4/5 py-2 my-2 min-w-96 grid grid-cols-[3fr_1fr] gap-x-12">
      <div className="">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
      <SwitchButton value={value} onChange={onChange} isInitiallySubbed={isInitiallySubbed}/>
    </div>
  );
}

export default AlertaSubber;
