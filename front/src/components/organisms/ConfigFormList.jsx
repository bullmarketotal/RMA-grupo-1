import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";

const RangeInput = ({ typeName, range, onRangeChange }) => {
  const handleMinChange = (e) => {
    const newMin = parseFloat(e.target.value);
    onRangeChange([newMin, range[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = parseFloat(e.target.value);
    onRangeChange([range[0], newMax]);
  };

  return (
    <div className="mb-3">
      <label className="form-label">{typeName}</label>
      <div className="d-flex gap-3">
        <div className="flex-fill">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Mínimo"
            value={range[0]}
            onChange={handleMinChange}
          />
          <small className="text-muted">Valor Mínimo</small>
        </div>
        <span className="align-self-center">-</span>
        
        <div className="flex-fill">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Máximo"
            value={range[1]}
            onChange={handleMaxChange}
          />
          <small className="text-muted">Valor Máximo</small>
        </div>
      </div>
    </div>
  );
};

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
      Tension: "Tensión",
      Precipitacion: "Precipitación",
    };
    return corrections[formattedName] || formattedName;
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:8000/config/");
        setConfig(response.data);
      } catch (err) {
        showNotification("Error al cargar la configuración", "error");
      }
    };

    fetchConfig();
  }, []);

  const handleRangeChange = (type, newRange) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      umbral: {
        ...prevConfig.umbral,
        [type]: newRange,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8000/config/", config);
      showNotification("Umbrales actualizados correctamente. ", "success");
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      showNotification("Error al guardar la configuración", "error");
    }
  };

  if (!config) return <div className="alert alert-info">Cargando...</div>;

  return (
    <div>
        <h2 className="display-6 font-weight-bold">Configuración de Umbrelas</h2>
        <p className="mb-4">Configura el rango válido de valores para cada tipo. </p>      {Object.keys(config.umbral).map((type) => (
        <div className="mb-3" key={type}>
          <RangeInput
            typeName={formatearNombre(type)}
            range={config.umbral[type]}
            onRangeChange={(newRange) => handleRangeChange(type, newRange)}
          />
        </div>
      ))}
      <div className="d-flex justify-content-center">
      <button className="btn btn-success mt-3" onClick={handleSave}>
        Confirmar
      </button>
    </div>

    </div>
  );
};

export default ConfigFormList;
