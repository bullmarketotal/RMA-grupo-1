import React, { useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import { useAxios } from "../context/AxiosProvider";

const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';

const ID_ALERTA = 1;
const baseURL = import.meta.env.VITE_API_URL + 'subscribe'

export function TestNotifications() {
    askNotificationPermission();
    const [consolelog, setConsolelog] = useState('')
    const axios = useAxios();

    async function subscribeUser(event) {
        try{
            if ('serviceWorker' in navigator) {
                // Se inyecta el service worker al navegador del usuario
                const registration = await navigator.serviceWorker.register('./service_worker.js');
        
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
    
    
                const alerta_id = parseInt(event.target.dataset.alerta);
        
                const requestBody = {
                    subscription,
                    alerta_id
                }
                // Enviar la suscripción al backend para almacenarla
        
                await axios.post(baseURL, requestBody);
        
                alert("Suscripción exitosa");
            }
        } catch(e) {
            setConsolelog( e.toString())
        }
    }
    
    

    return (
        <div>
            <h1 className="bold text-2xl">Test suscripcion</h1>
            <button data-alerta={ID_ALERTA} onClick={subscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600">Suscribirse</button>

            <p>{consolelog}</p>
            <p>url: {baseURL}</p>
        </div>
    )
}