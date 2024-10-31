export function filterDataByTime(data, timeFrame) {
  const currentTime = Date.now();
  const thresholdTime = currentTime - timeFrame;
  console.log("thresholdTime", thresholdTime, "currentTime", currentTime);

  const result = data.filter((item) => item.date >= thresholdTime);
  console.log(result);
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
