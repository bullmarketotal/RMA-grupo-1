import { formatTime, convertToTimestamp } from "./date";

export function filterDataByTime(data, timeFrame) {
  const currentTime = Date.now();
  const thresholdTime = currentTime - timeFrame;

  const result = data.filter((item) => {
    const itemDate = convertToTimestamp(item.date); // Convierte la fecha a timestamp si es un string
    return itemDate >= thresholdTime;
  });
  return result;
}

export function getMaxValue(data, key) {
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
