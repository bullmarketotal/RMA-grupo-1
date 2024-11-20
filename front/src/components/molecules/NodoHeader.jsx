import React, { useState } from "react";
import { LoadingSpinner, SubmitButton } from "../atoms";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { useUpdateSensor } from "../../hooks";
import { useNavigate } from "react-router-dom";

const NodoHeader = ({ sensor, loading }) => {
  console.log("SENSO:", sensor);
  const [isEditing, setIsEditing] = useState(false);
  const [editableSensor, setEditableSensor] = useState({
    identificador: sensor.identificador,
    porcentajeBateria: sensor.porcentajeBateria || 0,
    latitud: sensor.latitud || 0,
    longitud: sensor.longitud || 0,
    descripcion: sensor.descripcion,
  });

  const {
    updateSensor,
    loading: loadingSensor,
    error,
  } = useUpdateSensor(sensor.id, editableSensor);

  const navigate = useNavigate();

  const handleEditClick = async () => {
    if (isEditing) {
      await updateSensor();
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSensor({
      ...editableSensor,
      [name]:
        name === "latitud" || name === "longitud"
          ? parseFloat(value) || 0
          : value,
    });
  };

  function monitorearBateria() {
    navigate("/bateria-page");
  }

  return (
    <div id="header" className="flex items-center justify-between">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="info-sensor">
            {/* identificador */}
            <h1 className="flex text-3xl items-center normal-text font-semibold">
              <MdOutlineSettingsInputAntenna className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="identificador"
                  value={editableSensor.identificador}
                  onChange={handleChange}
                  className="normal text input-text border border-gray-300 rounded px-2 py-1 mr-2"
                />
              ) : (
                editableSensor.identificador
              )}
            </h1>
            {/* descripción */}

            <div className="normal-text text-sm py-2">
              {isEditing ? (
                <>
                  <textarea
                    className="input-text h-full w-full"
                    id="descripcion"
                    name="descripcion"
                    value={editableSensor.descripcion}
                    onChange={handleChange}
                    maxLength={256}
                    rows={4}
                  />
                  <div className="text-input text-right text-sm text-gray-500 mt-1">
                    {256 - editableSensor.descripcion.length} caracteres
                    restantes
                  </div>
                </>
              ) : (
                editableSensor.descripcion
              )}
            </div>

            <span className="normal-text">
              <i className="fa fa-map-marker mr-2" aria-hidden="true" />
              <span className="space-x-2">
                <b>Latitud:</b>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.00001"
                    name="latitud"
                    value={editableSensor.latitud}
                    onChange={handleChange}
                    className="input-text border border-gray-300 rounded px-2 py-1 w-24 ml-1"
                  />
                ) : (
                  editableSensor.latitud?.toFixed(5)
                )}

                <b>Longitud:</b>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.00001"
                    name="longitud"
                    value={editableSensor.longitud}
                    onChange={handleChange}
                    className="input-text border border-gray-300 rounded px-2 py-1 w-24 ml-1"
                  />
                ) : (
                  editableSensor.longitud?.toFixed(5)
                )}
              </span>
            </span>
          </div>

          <button
            id="btn-modificar"
            className="h-16 w-32 btn-action btn-active"
            onClick={handleEditClick}
          >
            {isEditing ? "Guardar" : "Modificar Nodo"}
          </button>
          <button
            id="btn-ver-bateria"
            className="h-16 w-32 btn-action btn-active"
            onClick={monitorearBateria}
          >
            Monitorear Bateria
          </button>
        </>
      )}
    </div>
  );
};

export default NodoHeader;
