import React, { useState } from "react";
import { ConfirmationPopover, LoadingSpinner, SubmitButton } from "../atoms";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useNodos } from "../../hooks";

const NodoHeader = ({ sensor, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableSensor, setEditableSensor] = useState({
    identificador: sensor.identificador,
    porcentajeBateria: sensor.porcentajeBateria || 0,
    latitud: sensor.latitud || 0,
    longitud: sensor.longitud || 0,
    descripcion: sensor.descripcion,
  });
  const { deleteNodo, updateNodo, loading: loadingNodo } = useNodos();

  const navigate = useNavigate();

  const handleDelete = async (nodoId) => {
    try {
      await deleteNodo(nodoId);
    } catch (error) {
      console.error("Error eliminando el nodo", nodoId, error);
    }
  };

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        await updateNodo(sensor.id, editableSensor);
        console.log("Sensor actualizado:", editableSensor);
      } catch (error) {
        console.error("Error actualizando el sensor:", error);
      }
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

  const idSensor = sensor.id;

  function monitorearBateria() {
    navigate(`/sensor/${idSensor}/bateria-page`);
  }

  return (
    <div id="header" className="flex items-center justify-between">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="info-sensor">
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
            onClick={handleUpdate}
          >
            {isEditing ? "Guardar" : "Modificar Nodo"}
          </button>
          <ConfirmationPopover
            onConfirm={() => handleDelete(sensor.id)}
            onCancel={() => console.log("Cancel")}
          >
            <span
              id="btn-eliminar"
              className="flex items-center justify-center h-16 w-32 btn-alert"
            >
              Eliminar Nodo
            </span>
          </ConfirmationPopover>
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
