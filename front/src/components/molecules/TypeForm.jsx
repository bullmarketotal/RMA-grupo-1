import React, { useState } from "react";
import axios from "axios";

const TypeForm = ({ typeName, initialRange, onSubmit, currentConfig }) => {
  const [range, setRange] = useState(initialRange);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedConfig = {
        ...currentConfig,
        umbral: {
          ...currentConfig.umbral,
          [typeName]: range,
        },
      };

      await axios.put("http://localhost:8000/config/", updatedConfig);
      onSubmit(typeName, range);
      alert("Configuración actualizada");
    } catch (error) {
      console.error("Error al actualizar la configuración:", error);
      alert("Error al actualizar la configuración");
    }
  };

  return (
    <tr>
      <td>{typeName}</td>
      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={range[0]}
          onChange={(e) => setRange([parseFloat(e.target.value), range[1]])}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={range[1]}
          onChange={(e) => setRange([range[0], parseFloat(e.target.value)])}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
        >
          Guardar
        </button>
      </td>
    </tr>
  );
};

export default TypeForm;
