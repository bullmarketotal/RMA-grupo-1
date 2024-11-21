import React from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import { useAxios } from "../context/AxiosProvider";

const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';

export function TestNotifications() {
    askNotificationPermission();

    const axios = useAxios();

    async function subscribeUser() {
        if ('serviceWorker' in navigator) {
            // Se inyecta el service worker al navegador del usuario
            const registration = await navigator.serviceWorker.register('./service_worker.js');
    
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
    
            // Enviar la suscripción al backend para almacenarla
    
            await axios.post('http://127.0.0.1:8000/subscribe', subscription);
    
            alert("Suscripción exitosa");
        }
    }
    

    return (
        <div>
            <h1 className="bold text-2xl">Test suscripcion</h1>
            <button onClick={subscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600">Suscribirse</button>
        </div>
    )
}