import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
