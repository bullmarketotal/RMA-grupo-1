/**
 * Convierte numero de ticks a un string de fecha y hora (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date) 
 * @param {number} ticks 
 * @returns {string} DD/MM/YYYY hh:mm
 */
export function tickFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (hours === '00')
    return `${day}/${month}/${year}`;
  else
    return `${hours}:${minutes}`
}

/**
* Convierte numero de ticks a un string de fecha y hora (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date) 
* @param {number} ticks 
* @returns {string} DD/MM/YYYY hh:mm
*/
export function dateFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Función para generar ticks que son solo horas enteras */
export const getHourlyTicks = (data) => {
  const oneHourInTicks = 3600 * 1000;
  const dataMin = Math.min(...data.map(d => d.fechaHora));
  const dataMax = Math.max(...data.map(d => d.fechaHora));

  const start = Math.ceil(dataMin / oneHourInTicks) * oneHourInTicks; // Primera hora completa
  const end = Math.floor(dataMax / oneHourInTicks) * oneHourInTicks; // Última hora completa
  const ticks = [];

  for (let tick = start; tick <= end; tick += oneHourInTicks) {
    ticks.push(tick);
  }

  return ticks;
};

export const randomDataForDoubleChart = () => {
  const data = [];
  const startDate = new Date(2024, 8, 30, 0, 0, 0); // Empieza el 30 de septiembre de 2024 a medianoche
  let temp = 15; // Temperatura inicial
  let nivel = 2; // Nivel inicial

  for (let i = 0; i < 30; i++) {
    const fechaHora = new Date(startDate.getTime() + i * 20 * 60 * 1000); // 20 minutos entre cada fecha
    temp += (Math.random() - 0.5) * 2; // Simulación de variaciones de temperatura, max +-1 grado por registro
    if (i >= 8 && i < 16) temp += 0.5; // Aumenta la temperatura durante las horas del día
    if (i >= 16) temp -= 0.5; // Baja la temperatura hacia la tarde/noche

    // Temperatura entre 0 y 30 grados
    if (temp < 0) temp = 0;
    if (temp > 30) temp = 30;

    nivel += (Math.random() - 0.5) * 0.5; // Simulación de variación de nivel
    if (nivel < 0) nivel = 0;
    if (nivel > 5) nivel = 5;

    data.push({
      fechaHora: fechaHora,
      temp: parseFloat(temp.toFixed(2)),
      nivel: parseFloat(nivel.toFixed(2)),
    });
  }
  return data;
}