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
            <h2 className="d-flex align-items-center normal-text font-semibold">
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
            <p className="normal-text font-semibold">ACA ESTAMOS VIENDO LA BATERIA.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BateriaHeader;