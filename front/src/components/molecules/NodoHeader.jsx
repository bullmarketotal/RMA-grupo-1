import React, { useState } from "react";
import { LoadingSpinner } from "../atoms";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";

const NodoHeader = ({ sensor, loading }) => {
  const { identificador, latitud, longitud, descripcion } = sensor;
  const [isEditing, setIsEditing] = useState(false);
  const [editableSensor, setEditableSensor] = useState({
    identificador: identificador,
    latitud: latitud,
    longitud: longitud,
    descripcion: descripcion,
  });

  const handleEditClick = () => {
    if (isEditing) {
      console.log("Nodo actualizado:", editableSensor);
      //TODO implementar la modificación al nodo
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSensor({
      ...editableSensor,
      [name]: value,
    });
  };

  return (
    <div id="header" className="flex justify-between">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="info-sensor">
            <h1 className="flex items-center normal-text font-semibold">
              <MdOutlineSettingsInputAntenna className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="identificador"
                  value={editableSensor.identificador}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 mr-2"
                />
              ) : (
                editableSensor.identificador
              )}
            </h1>
            <p className="text-sm text-gray-600">
              {editableSensor.descripcion}
            </p>
            <span className="text-gray-800">
              <i className="fa fa-map-marker mr-2" aria-hidden="true" />
              <span>
                <b>Latitud:</b>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.00001"
                    name="latitud"
                    value={editableSensor.latitud}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-24 ml-1"
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
                    className="border border-gray-300 rounded px-2 py-1 w-24 ml-1"
                  />
                ) : (
                  editableSensor.longitud?.toFixed(5)
                )}
              </span>
            </span>
          </div>
          <button
            id="btn-modificar"
            className="h-16 w-32 btn btn-active"
            onClick={handleEditClick}
          >
            {isEditing ? "Guardar" : "Modificar Nodo"}
          </button>
        </>
      )}
    </div>
  );
};

export default NodoHeader;
