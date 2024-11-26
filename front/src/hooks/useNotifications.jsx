import { useState, useEffect } from "react"
import { useAxios } from "../context/AxiosProvider"
const baseURL = import.meta.env.VITE_API_URL

export const useNotifications = () => {
    const [notificaciones, setNotificaciones] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const axios = useAxios()

    useEffect(() => {
        axios.get(baseURL + "/usernotifications", { params: {
            count_limit: 5
        }})
        .then(res => {
            setNotificaciones(res.data)
            setLoading(false)
        })
        .catch(e => setError(e))
    },[])

    return { notificaciones, loading, error }
}