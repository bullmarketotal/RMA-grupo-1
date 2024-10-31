export function filterDataByTime(data, timeFrame) {
  const currentTime = Date.now();
  const thresholdTime = currentTime - timeFrame;

  const result = data.filter((item) => {
    // Convierte la fecha a timestamp si es un string
    const itemDate =
      typeof item.date === "string" ? new Date(item.date).getTime() : item.date;
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

function formatTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")} hs`;
}
