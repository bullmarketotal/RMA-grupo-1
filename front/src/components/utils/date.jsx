/**
 * Obtiene una cadena del tiempo transcurrido desde una fecha
 * @param {*} lastData
 * @returns
 */
export const obtenerTimeAgoString = (lastData) => {
  if (!lastData || data.lastData == 0) {
    return "Sin datos";
  }
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

export const obtenerStringTiempoDesdeUltimoDato = (data) => {
  if (!data || data.length == 0) {
    return "Sin datos";
  }
  const lastTime = new Date(data[data.length - 1].date);
  const now = new Date();

  const minutesBetween = (now - lastTime) / (1000 * 60);

  // Retorno segun hace cuanto haya sido
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
 * @param {*} date
 * @returns
 */
export const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")} hs`;
};

/**
 * Convierte un string a timestamp
 * @param {*} date
 * @returns
 */
export const convertToTimestamp = (date) =>
  typeof date === "string" ? new Date(date).getTime() : date;

/**
 * Convierte un campo especifico a Timestamp en una Colección
 * @param {*} collection
 * @param {*} dateField
 * @returns
 */
export const convertFieldToTimestamp = (collection, dateField) => {
  return collection.map((item) => {
    const dateValue = item[dateField];
    const timestamp = convertToTimestamp(dateValue);
    return {
      ...item,
      [dateField]: timestamp,
    };
  });
};
