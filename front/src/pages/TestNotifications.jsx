import React, { useEffect, useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import { useAxios } from "../context/AxiosProvider";
import Container from "../components/atoms/Container";

const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';
const baseURL = import.meta.env.VITE_API_URL

export function TestNotifications() {
    askNotificationPermission();
    const [consolelog, setConsolelog] = useState('')
    const [alertId, setAlertId] = useState(1)
    const [subbedAlerts, setSubbedAlerts] = useState([])

    const axios = useAxios();

    useEffect(() => {
        axios.get(baseURL + "/subscriptions")
        .then(res => setSubbedAlerts(res.data))
        .catch()
    }, [])

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
        
                const response = await axios.post(baseURL + '/subscribe', requestBody);
        
                alert(response.data.message);
            }
        } catch(e) {
            console.log("Error al suscribirse: ", e)
        }
    }

    async function unsubscribeUser(event) {
        const requestBody = {
            alerta_id: alertId
        }

        const response = await axios.delete(baseURL + '/unsubscribe', { params: { alerta_id: alertId }})
        alert(response.data.message)
    }
    
    function handleSelect(event){
        setAlertId(event.target.value);
    }

    return (
        <Container>
            <h1 className="bold text-2xl">Mis suscripciones</h1>

            <div>
                <h2 className="text-2xl font-bold">Alertas por nivel hidrométrico</h2>
                <div className=" w-3/5 py-2 my-2 min-w-96 grid grid-cols-[auto_1fr]">
                    <div className="">
                        <h3 className="text-xl font-bold">Alerta amarilla</h3>
                        <p>Avisar cuando el nivel supere los 0.5m</p>
                    </div>
                    <button onClick={subscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600 self-end place-self-center">Suscribirse</button>
                </div>
            </div>

            <select onChange={handleSelect}>
                <option value={1}>Alerta amarilla</option>
                <option value={2}>Alerta naranja</option>
                <option value={3}>Alerta roja</option>
                <option value={4}>Dato invalido</option>
                <option value={5}>Bateria baja</option>
            </select><hr></hr>
            <button onClick={subscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600 me-5 my-4">Suscribirse</button>
            <button  onClick={unsubscribeUser} className="p-2 border rounded bg-cyan-200 hover:bg-slate-600 my-4">Desuscribirse</button>
        </Container>
    )
}