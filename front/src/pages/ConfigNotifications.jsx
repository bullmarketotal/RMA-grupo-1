import React, { useEffect, useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import Container from "../components/atoms/Container";
import AlertaSubber from "../components/molecules/AlertaSubber";
import { useAxios } from "../context/AxiosProvider";
import { LoadingSpinner } from "../components/atoms";

const baseURL = import.meta.env.VITE_API_URL

export function ConfigNotifications() {
    askNotificationPermission();

    const [subbedAlerts, setSubbedAlerts] = useState([])
    const [loadingAlerts, setLoadingAlerts] = useState(true)
    const axios = useAxios();

    useEffect(() => {
        axios.get(baseURL + "/subscriptions")
        .then(res => setSubbedAlerts(res.data))
        .then(() => setLoadingAlerts(false))
        .catch(() => console.error("Error al buscar las alertas del usuario: ", e))
    }, [])

    function isSubscribed(alerta_id) {
        if(subbedAlerts.length === 0)
            return false
        const existe = subbedAlerts.some(sub => sub.id === alerta_id)
        console.log("Existe? ", existe)
        return existe
    }

    return (
        <Container>
            <div className="roboto">
                <h1 className="bold text-3xl font-bold ">Mis suscripciones</h1>
                <p className="mt-4 text-lg">En este panel podés configurar las alertas que te interesa recibir personalmente. Recordá permitir las notificaciones en tu navegador.</p>
                    {loadingAlerts ? <LoadingSpinner/> : (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold">Alertas por nivel hidrométrico</h2>
                            <AlertaSubber value={1} title="Alerta Amarilla" description={"Avisarme cuando el nivel de un nodo supere los 0.5m"} isInitiallySubbed={ isSubscribed(1) }/>
                            <AlertaSubber value={2} title="Alerta Naranja" description={"Avisarme cuando el nivel de un nodo supere 1m"} isInitiallySubbed={ isSubscribed(2) }/>
                            <AlertaSubber value={3} title="Alerta Roja" description={"Avisarme cuando el nivel de un nodo supere los 2m"} isInitiallySubbed={ isSubscribed(3) }/>
                            <h2 className="text-2xl font-bold">Alertas de administración
                            </h2>
                            <AlertaSubber value={4} title="Datos inválidos" description={"Avisarme cuando llegue un dato erróneo a algún nodo"} isInitiallySubbed={ isSubscribed(4) }/>
                            <AlertaSubber value={5} title="Batería baja" description={"Avisarme cuando un nodo tenga batería baja"} isInitiallySubbed={ isSubscribed(5) }/>
                        </div>
                    )}

            </div>
        </Container>
    )
}