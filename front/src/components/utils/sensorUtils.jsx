import { formatTime, convertToTimestamp } from "./date";

/**
 * Filtra en base a una fecha en una colección
 * @param {*} data
 * @param {*} timeFrame
 * @returns
 */
export function filterDataByTime(data, timeFrame) {
  const currentTime = Date.now();
  const thresholdTime = currentTime - timeFrame;

  const result = data.filter((item) => {
    const itemDate = convertToTimestamp(item.date);
    return itemDate >= thresholdTime;
  });
  return result;
}

/**
 * Busca el valor maximo de un campo especifico en una colección
 * @param {*} data
 * @param {*} key
 * @returns
 */
export function getMaxValue(data, key) {
  console.log("UTILS:",data.length);
  if (data.length === 0) {
    return { [key]: "--", stringTime: "Sin datos" };
  }

  const max = data.reduce((acc, item) => {
    return item[key] > acc[key] ? item : acc;
  });
  const dateOfMax = new Date(max.date);

  return {
    [key]: max[key].toFixed(2),
    stringTime: formatTime(dateOfMax),
  };
}
