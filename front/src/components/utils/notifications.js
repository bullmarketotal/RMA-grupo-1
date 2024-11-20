const publicVapidKey = 'BEYUuNByv4Pt5XP-zxDeU1zqEQpitr9_D98zKwTm1DiDP0vVh1iazUmEXckfEXYawnzytMjOEyCJsQ8NX7-gGHk';

export async function subscribeUser() {
    if ('serviceWorker' in navigator) {
        // Se inyecta el service worker al navegador del usuario
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        // Enviar la suscripción al backend para almacenarla
        await fetch('/subscribe', {  // Endpoint separado para la suscripción
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        });

        alert("Suscripción exitosa");
    }
}

// Se requiere que la public key este en base64
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export function askNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notificaciones permitidas');
            } else {
                console.log('Notificaciones no permitidas');
            }
        });
    }
}