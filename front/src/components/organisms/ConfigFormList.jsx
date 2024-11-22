import React, { useState, useEffect } from "react";
import TypeForm from "../molecules/TypeForm";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext"; 


const ConfigFormList = () => {
  const [config, setConfig] = useState(null);
  const { showNotification } = useNotification(); 


  const formatearNombre = (typeName) => {
    const formattedName = typeName
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const corrections = {
      "Nivel Hidrometrico": "Nivel Hidrométrico",
      "Tension": "Tensión",
      "Precipitacion": "Precipitación",
    };
    return corrections[formattedName] || formattedName;
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:8000/config/");
        console.log("Respuesta del backend:", response.data);
        setConfig(response.data);
      } catch (err) {
        console.error("Error al obtener la config:", err);
        showNotification("Error al cargar la configuración", "error"); 

      }
    };

    fetchConfig();
  }, []);

  const handleUpdate = (type, newRange) => {
    const updatedConfig = { ...config, umbral: { ...config.umbral, [type]: newRange } };
    setConfig(updatedConfig);
    showNotification("Valor actualizado correctamente", "success"); 

  };

  if (!config) return <div className="alert alert-info">Cargando...</div>;

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Tipo</th>
            <th scope="col"> Rango Mínimo</th>
            <th scope="col"> Rango Máximo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(config.umbral).map((type) => (
            <TypeForm
              key={type}
              typeName={formatearNombre(type)} 
              type={type} 
              initialRange={config.umbral[type]}
              currentConfig={config}
              onSubmit={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfigFormList;
