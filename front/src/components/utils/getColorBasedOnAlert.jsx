const getColorBasedOnAlert = (alertLevel) => {
  switch (alertLevel) {
    case "low":
      return "green-500";
    case "medium":
      return "yellow-500";
    case "high":
      return "orange-500";
    case "critical":
      return "red-500";
  }
};

export default getColorBasedOnAlert;
