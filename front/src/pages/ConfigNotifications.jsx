import React, { useEffect, useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import Container from "../components/atoms/Container";
import AlertaSubber from "../components/molecules/AlertaSubber";
import { useAxios } from "../context/AxiosProvider";


const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';
const baseURL = import.meta.env.VITE_API_URL

export function ConfigNotifications() {
    askNotificationPermission();
    const [consolelog, setConsolelog] = useState('')
    const [alertId, setAlertId] = useState(1)
    const [subbedAlerts, setSubbedAlerts] = useState([])

    const [checkedSubs, setCheckedSubs] = useState({
        alertaAmarilla: false,
        alertaNaranja: false,
        alertaRojo: false,
        datoInvalido: false,
        bateriaBaja: false
      });

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
                <AlertaSubber value={1} title="Alerta Amarilla" description={"Avisar cuando el nivel supere los 0.5m"}/>
                <AlertaSubber value={2} title="Alerta Naranja" description={"Avisar cuando el nivel supere 1m"}/>
                <AlertaSubber value={3} title="Alerta Roja" description={"Avisar cuando el nivel supere los 2m"}/>
                <AlertaSubber value={4} title="Datos inválidos" description={"Avisar cuando llegue un dato erróneo"}/>
                <AlertaSubber value={5} title="Batería baja" description={"Avisar cuando un nodo tenga batería baja"}/>
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