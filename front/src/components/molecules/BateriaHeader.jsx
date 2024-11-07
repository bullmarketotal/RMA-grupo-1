import React, { useState } from "react";
import { LoadingSpinner } from "../atoms";
import { useNavigate } from "react-router-dom";

const BateriaHeader = ({ sensor, loading }) => {
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
      console.log("Sensor actualizado:", editableSensor);
      // actualizar el sensor con la API
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
    <div id="header" className="d-flex justify-content-between pb-1">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="info-sensor">
            <h2 className="d-flex align-items-center">
              <i className="fa fa-rss me-2" aria-hidden="true" />
              {isEditing ? (
                <input
                  type="text"
                  name="identificador"
                  value={editableSensor.identificador}
                  onChange={handleChange}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "5px",
                    marginRight: "10px",
                  }}
                />
              ) : (
                editableSensor.identificador
              )}
            </h2>
            <p>ACA ESTAMOS VIENDO LA BATERIA.</p>
            <span>
              <i className="fa fa-map-marker me-2" aria-hidden="true" />{" "}
              <span>
                <b>Latitud:</b>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    step="0.00001"
                    name="latitud"
                    value={editableSensor.latitud}
                    onChange={handleChange}
                    style={{ width: "100px", marginLeft: "5px" }}
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
                    style={{ width: "100px", marginLeft: "5px" }}
                  />
                ) : (
                  editableSensor.longitud?.toFixed(5)
                )}
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BateriaHeader;