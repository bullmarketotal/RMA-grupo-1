import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";
import AlertaConfigForm from "../molecules/AlertaConfigForm";
import BotonVolver from "../atoms/BotonVolver";

const ConfigAlert = () => {
  const [alerts, setAlerts] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:8000/alertaconfig/");
        setAlerts(response.data);
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
        showNotification("Error al cargar la configuración", "error");
      }
    };

    fetchConfig();
  }, [showNotification]);

  const handleAlertChange = (alertName, newValue) => {
    setAlerts((prevAlerts) => {
      const updatedAlerts = { ...prevAlerts };

      if (alertName === "amarilla") {
        updatedAlerts.nivel_hidrometrico_alertas.amarilla = newValue;
      } else if (alertName === "naranja") {
        updatedAlerts.nivel_hidrometrico_alertas.naranja = newValue;
      } else if (alertName === "roja") {
        updatedAlerts.nivel_hidrometrico_alertas.roja = newValue;
      } else if (alertName === "tension_bateria_baja") {
        updatedAlerts.tension_bateria_baja = newValue;
      }

      return updatedAlerts;
    });
  };

  const handleSave = async () => {
    const { amarilla, naranja, roja } = alerts.nivel_hidrometrico_alertas;

    if (naranja < amarilla) {
      showNotification("El valor de la alerta naranja no puede ser menor que el valor de la alerta amarilla.", "error");
      return;
    }
    if (roja < naranja) {
      showNotification("El valor de la alerta roja no puede ser menor que el valor de la alerta naranja.", "error");
      return;
    }

    try {
      await axios.put("http://localhost:8000/alertaconfig/", {
        nivel_hidrometrico_alertas: alerts.nivel_hidrometrico_alertas,
        tension_bateria_baja: alerts.tension_bateria_baja,
      });
      showNotification("Alertas actualizadas correctamente", "success");
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      showNotification("Error al guardar la configuración", "error");
    }
  };

  if (!alerts) return <div className="alert alert-info">Cargando...</div>;

  return (
    <div>
      <h2 className="display-6 font-weight-bold">Configuración de Alertas</h2>
      <p className="mb-4">Configura el valor a partir del cual se disparará la alarma correspondiente. </p>
      <AlertaConfigForm
        alerts={alerts}
        onAlertChange={handleAlertChange}
      />
   <div className="d-flex justify-content-center">
  <button className="btn btn-success mt-3" onClick={handleSave}>
    Confirmar
  </button>
</div>

    </div>
  );
};


export default ConfigAlert;
