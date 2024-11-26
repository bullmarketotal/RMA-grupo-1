export const useNotifications = () => {
    const notifications = [{
        alerta_id: 1,
        fecha_hora: new Date(),
        titulo: "Legolas - Alerta Naranja",
        message: "Nivel hidrométrico de 123.0cm"
    }]

    return { notifications, loading: false }
}