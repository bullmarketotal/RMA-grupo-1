export const obtenerTimeAgoString = (lastData) => {
  const lastTime = new Date(lastData.date);
  const now = new Date();
  const minutesBetween = (now - lastTime) / (1000 * 60);

  if (minutesBetween < 1) return `Hace menos de un minuto`;
  if (minutesBetween < 2) return `Hace un minuto`;
  if (minutesBetween < 59) return `Hace ${minutesBetween.toFixed(0)} minutos`;
  if (minutesBetween < 120) return `Hace 1 hora`;
  if (minutesBetween < 60 * 24)
    return `Hace ${Math.floor(minutesBetween / 60).toFixed(0)} horas`;

  return `Hace ${Math.floor(minutesBetween / (60 * 24)).toFixed(0)} días`;
};

/**
 * Formatea una fecha a "HH:mm hs"
 */
export const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")} hs`;
};

/**
 * Convierte una fecha a un timestamp.
 */
export const convertToTimestamp = (date) =>
  typeof date === "string" ? new Date(date).getTime() : date;
