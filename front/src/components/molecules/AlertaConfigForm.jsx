import React from "react";
import AlertaInput from "./AlertaInput";

const AlertaConfigForm = ({ alerts, onAlertChange }) => {
  const formatearNombre = (alertName) => {
    const formattedName = alertName.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  
    const corrections = {
      amarilla: "Alerta Amarilla",
      naranja: "Alerta Naranja",
      roja: "Alerta Roja",
      tension_bateria_baja: "Tensión Batería Baja",
    };
  
    return corrections[alertName] || formattedName;
  };
  

  return (
    <div>
      {Object.keys(alerts.nivel_hidrometrico_alertas).map((alertName) => (
        <div className="mb-3" key={alertName}>
          <AlertaInput
            alertName={formatearNombre(alertName)}
            value={alerts.nivel_hidrometrico_alertas[alertName]}
            onAlertChange={(newValue) => onAlertChange(alertName, newValue)}
          />
        </div>
      ))}
      <div className="mb-3">
        <AlertaInput
          alertName={formatearNombre("tension_bateria_baja")}
          value={alerts.tension_bateria_baja}
          onAlertChange={(newValue) => onAlertChange("tension_bateria_baja", newValue)}
        />
      </div>
    </div>
  );
};

export default AlertaConfigForm;
