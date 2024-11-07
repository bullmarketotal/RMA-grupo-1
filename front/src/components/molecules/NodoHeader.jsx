import React, { useState } from "react";
import { LoadingSpinner } from "../atoms";
import { useNavigate } from "react-router-dom";

const NodoHeader = ({ sensor, loading }) => {
  const { identificador, latitud, longitud } = sensor;
  const [isEditing, setIsEditing] = useState(false);
  const [editableSensor, setEditableSensor] = useState({
    identificador: identificador,
    latitud: latitud,
    longitud: longitud,
  });
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (isEditing) {
      console.log("Nodo actualizado:", editableSensor);
      //TODO implementar la modificación al nodo
    }
    setIsEditing(!isEditing);
  };

  function monitorearBateria(){
    navigate("/bateria-page");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSensor({
      ...editableSensor,
      [name]: value,
    });
  };

  return (
    <div id="header" className="flex justify-between pb-1">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="info-sensor">
            <h2 className="flex items-center text-lg font-semibold">
              <i className="fa fa-rss mr-2" aria-hidden="true" />
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
            </h2>
            <p className="text-sm text-gray-600">
              Una breve descripción del nodo irá aquí.
            </p>
            <span className="text-gray-800">
              <i className="fa fa-map-marker mr-2" aria-hidden="true" />
              <span>
                <b>Latitud:</b>{" "}
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
                )}{" "}
                <b>Longitud:</b>{" "}
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
            className="btn bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded mt-1"
            onClick={handleEditClick}
          >
            {isEditing ? "Guardar" : "Modificar Nodo"}
          </button>
          <button
            id="btn-ver-bateria"
            className="btn btn-primary align-self-start"
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
