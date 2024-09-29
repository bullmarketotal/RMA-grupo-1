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
    
    if(hours === '00')
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