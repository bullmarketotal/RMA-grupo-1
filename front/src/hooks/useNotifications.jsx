import { useState, useEffect } from "react"
import { useAxios } from "../context/AxiosProvider"
const baseURL = import.meta.env.VITE_API_URL

export const useNotifications = ({count_limit}) => {
    const [notificaciones, setNotificaciones] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [unreadPresent, setUnreadPresent] = useState(false)

    const axios = useAxios()

    useEffect(() => {
        axios.get(baseURL + "/usernotifications", { params: {
            count_limit
        }})
        .then(res => {
            setNotificaciones(res.data)
            setLoading(false)
            setUnreadPresent(res.data.some(noti => !noti.is_read))
        })
        .catch(e => {
            setError(e)
            setLoading(false)
        })
    },[])

    return { notificaciones, loadingNotifications: loading, error, unreadPresent }
}