/**
 * Convierte numero de ticks a un string de fecha (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date) 
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