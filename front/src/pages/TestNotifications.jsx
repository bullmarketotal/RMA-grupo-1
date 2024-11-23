import React, { useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import { useAxios } from "../context/AxiosProvider";

const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';
const baseURL = import.meta.env.VITE_API_URL

export function TestNotifications() {
    askNotificationPermission();
    const [consolelog, setConsolelog] = useState('')
    const [alertId, setAlertId] = useState(1)
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
    
    
                if(!alertId) {
                    alert("Elegi un alerta capo")
                    return
                }
                
                const requestBody = {
                    subscription,
                    alerta_id: alertId
                }
                // Enviar la suscripción al backend para almacenarla
        
                await axios.post(baseURL + '/subscribe', requestBody);
        
                alert("Suscripción exitosa");
            }
        } catch(e) {
            setConsolelog( e.toString())
        }
    }

    async function unsubscribeUser(event) {
        const requestBody = {
            alerta_id: alertId
        }

        await axios.delete(baseURL + '/unsubscribe', { params: { alerta_id: alertId }})
        alert("Desuscripto")
    }
    
    function handleSelect(event){
        setAlertId(event.target.value);
    }

    return (
        <div>
            <h1 className="bold text-2xl">Test suscripcion</h1>
            <select onChange={handleSelect}>
                <option value={1}>Alerta amarilla</option>
                <option value={2}>Alerta naranja</option>
                <option value={3}>Alerta roja</option>
                <option value={4}>Dato invalido</option>
                <option value={5}>Bateria baja</option>
            </select><hr></hr>
            <button onClick={subscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600 me-5 my-4">Suscribirse</button>
            <button  onClick={unsubscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600 my-4">Desuscribirse</button>
            <div className="rounded border p-2">
                <h2 className="font-bold">Consola:</h2>
                <p>{consolelog}</p>
                <p>url: {baseURL}</p>
            </div>
        </div>
    )
}