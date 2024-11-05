import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 500); // Espera 500 ms
    return () => clearTimeout(timer);
  }, []);

  if (!showSpinner) return null;

  const styles = {
    spinner: {
      animation: "spin 1s linear infinite",
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      stroke: "#007bff",
      strokeWidth: "5",
      fill: "none",
      cx: "25",
      cy: "25",
      r: "20",
    },
    visuallyHidden: {
      visuallyHidden: true,
    },
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <svg
        style={styles.spinner}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle style={styles.circle} />
      </svg>
      <span className={styles.visuallyHidden}></span>
    </div>
  );
};

export default LoadingSpinner;
