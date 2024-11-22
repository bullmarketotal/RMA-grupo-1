import React, { useState, useEffect } from "react";
import TypeForm from "../molecules/TypeForm";
import axios from "axios";

const ConfigFormList = () => {
  const [config, setConfig] = useState(null);

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
      }
    };

    fetchConfig();
  }, []);

  const handleUpdate = (type, newRange) => {
    const updatedConfig = { ...config, umbral: { ...config.umbral, [type]: newRange } };
    setConfig(updatedConfig);
  };

  if (!config) return <div className="alert alert-info">Cargando...</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="">
          <tr>
            <th scope="col">Tipo de Umbral</th>
            <th scope="col">Valor Mínimo</th>
            <th scope="col">Valor Máximo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(config.umbral).map((type) => (
            <TypeForm
              key={type}
              typeName={formatearNombre(type)} 
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
