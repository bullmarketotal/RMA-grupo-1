/**
 * Convierte numero de ticks a un string de fecha y hora (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date)
 * @param {number} ticks
 * @returns {string} DD/MM/YYYY hh:mm
 */
export function tickFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

/**
 * Convierte numero de ticks a un string de fecha y hora (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date)
 * @param {number} ticks
 * @returns {string} DD/MM/YYYY hh:mm
 */
export function dateFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const obtenerStringTiempoDesdeUltimoDato = (data) => {

  if(!data || data.length == 0) {
    return 'Sin datos'
  }
  const lastTime = new Date(data[data.length - 1].date)
  const now = new Date();
  
  const minutesBetween = (now - lastTime) / (1000 * 60);

  // Retorno segun hace cuanto haya sido
  if(minutesBetween < 1)
      return `Hace menos de un minuto`
  if(minutesBetween < 2)
      return `Hace un minuto`
  if(minutesBetween < 59)
      return `Hace ${minutesBetween.toFixed(0)} minutos`
  if(minutesBetween < 120)
      return `Hace 1 hora`
  if(minutesBetween < 60 * 24)
      return `Hace ${Math.floor(minutesBetween / 60).toFixed(0)} horas`
  
  return `Hace ${Math.floor(minutesBetween / (60 * 24)).toFixed(0)} días`
}

/**
 * Función para generar ticks que son solo horas enteras */
export const getHourlyTicks = (data) => {
  const oneHourInTicks = 3600 * 1000;
  const dataMin = Math.min(...data.map((d) => d.fechaHora));
  const dataMax = Math.max(...data.map((d) => d.fechaHora));

  const start = Math.ceil(dataMin / oneHourInTicks) * oneHourInTicks; // Primera hora completa
  const end = Math.floor(dataMax / oneHourInTicks) * oneHourInTicks; // Última hora completa
  const ticks = [];

  for (let tick = start; tick <= end; tick += oneHourInTicks) {
    ticks.push(tick);
  }

  return ticks;
};

export const randomDataForDoubleChart = (count) => {
  const data = [];
  const ENTRY_COUNT = count || 500;
  const MAX_TEMP = 40;
  const MIN_TEMP = -10;
  const MINUTES_BETWEEN_ENTRIES = 20;

  const startDate = new Date(2024, 10, 4, 17, 5, 0);
  //startDate.setDate(startDate.getDate() - 7);
  let temp = 15; // Temperatura inicial
  let nivel = 2; // Nivel inicial

  for (let i = 0; i < ENTRY_COUNT; i++) {
    const fechaHora = new Date(
      startDate.getTime() + i * MINUTES_BETWEEN_ENTRIES * 60 * 1000
    ); // 20 minutos entre cada fecha
    temp += (Math.random() - 0.5) * 4; // Simulación de variaciones de temperatura, max +-1 grado por registro
    if (fechaHora.getHours() >= 8 && fechaHora.getHours() < 16) temp += 1; // Aumenta la temperatura durante las horas del día
    if (fechaHora.getHours() >= 16) temp -= 1; // Baja la temperatura hacia la tarde/noche

    // Temperatura entre 0 y 30 grados
    if (temp < MIN_TEMP) temp = MIN_TEMP;
    if (temp > MAX_TEMP) temp = MAX_TEMP;

    nivel += (Math.random() - 0.53) * 0.5; // Simulación de variación de nivel
    if (nivel < 0) nivel = 0;
    if (nivel > 5) nivel = 5;

    data.push({
      date: fechaHora.getTime(),
      temperatura: parseFloat(temp.toFixed(2)),
      nivel_hidrometrico: parseFloat(nivel.toFixed(2)),
    });
  }
  return data;
};

export const getMidnightTicks = (firstTick, lastTick) => {
  const firstDate = new Date(firstTick);
  const firstMidnight = new Date(firstDate);
  firstMidnight.setHours(0, 0, 0);

  // Si el primer tick es después de la medianoche, no queremos retroceder un día, así que verificamos:
  if (firstDate.getTime() > firstMidnight.getTime()) {
    firstMidnight.setDate(firstMidnight.getDate() + 1); // Ajusta al día siguiente si es necesario
  }

  // Genera una lista de medianoches a partir del primer tick
  const midnightTicks = [];
  const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
  let currentMidnight = firstMidnight.getTime();

  // Sigue generando medianoches hasta que pases el último tick
  while (currentMidnight <= lastTick) {
    midnightTicks.push(currentMidnight);
    currentMidnight += oneDayInMs; // Suma 24 horas
  }
  return midnightTicks;
};

export const backgroundColorBasedInAlarm = (nivel) => {

  // Niveles de alerta
  const ALERT_THRESHOLDS_IN_M = {
    YELLOW: 0.5,
    ORANGE: 1,
    RED: 2
  }

  if(nivel < ALERT_THRESHOLDS_IN_M.YELLOW)
    return "from-blue-400 to-blue-600"
  if(nivel < ALERT_THRESHOLDS_IN_M.ORANGE)
    return "from-yellow-400 to-yellow-600"
  if(nivel < ALERT_THRESHOLDS_IN_M.RED)
    return "from-orange-400 to-orange-600"
  
  return "from-red-400 to-red-600"
}