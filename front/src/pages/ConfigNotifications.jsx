import React, { useEffect, useState } from "react";
import { askNotificationPermission, urlBase64ToUint8Array } from "../components/utils/notifications";
import Container from "../components/atoms/Container";
import AlertaSubber from "../components/molecules/AlertaSubber";
import { useAxios } from "../context/AxiosProvider";
import { LoadingSpinner } from "../components/atoms";
import BotonVolver from "../components/atoms/BotonVolver";

const baseURL = import.meta.env.VITE_API_URL

export function ConfigNotifications() {
    askNotificationPermission();

    const [subbedAlerts, setSubbedAlerts] = useState([])
    const [loadingAlerts, setLoadingAlerts] = useState(true)
    const [loadingConfig, setLoadingConfig] = useState(true)
    const [config, setConfig] = useState({})
    const axios = useAxios();

    useEffect(() => {
        axios.get(baseURL + "/subscriptions")
        .then(res => setSubbedAlerts(res.data))
        .then(() => setLoadingAlerts(false))
        .catch((e) => console.error("Error al buscar las alertas del usuario: ", e))

        axios.get(baseURL + "/config")
        .then(res => setConfig(res.data.nivel_hidrometrico_alertas))
        .then(() => setLoadingConfig(false))
        .catch((e) => console.error("Error al cargar la configuración de alertas: ", e))
    }, [])

    function isSubscribed(alerta_id) {
        if(subbedAlerts.length === 0)
            return false
        return subbedAlerts.some(sub => sub.id === alerta_id)
    }

    return (
        <Container>
            <div className="roboto">
                <h1 className="bold text-3xl font-bold ">Mis suscripciones</h1>
                <p className="mt-4 text-lg">En este panel podés configurar las alertas que te interesa recibir personalmente. Recordá permitir las notificaciones en tu navegador.</p>
                    {loadingAlerts || loadingConfig ? <LoadingSpinner/> : (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold">Alertas por nivel hidrométrico</h2>
                            <AlertaSubber value={1} title="Alerta Amarilla" description={`Avisarme cuando el nivel de un nodo sea superior a ${config.amarilla / 100}m`} isInitiallySubbed={ isSubscribed(1) }/>
                            <AlertaSubber value={2} title="Alerta Naranja" description={`Avisarme cuando el nivel de un nodo sea superior a ${config.naranja / 100}m`} isInitiallySubbed={ isSubscribed(2) }/>
                            <AlertaSubber value={3} title="Alerta Roja" description={`Avisarme cuando el nivel de un nodo sea superior a ${config.roja / 100}m`} isInitiallySubbed={ isSubscribed(3) }/>
                            <h2 className="text-2xl font-bold">Alertas de administración
                            </h2>
                            <AlertaSubber value={4} title="Datos inválidos" description={"Avisarme cuando llegue un dato erróneo a algún nodo"} isInitiallySubbed={ isSubscribed(4) }/>
                            <AlertaSubber value={5} title="Batería baja" description={"Avisarme cuando un nodo tenga batería baja"} isInitiallySubbed={ isSubscribed(5) }/>
                        </div>
                    )}

            </div>
            <BotonVolver ruta="/configuracion" texto="Volver" />
        </Container>
    )
}