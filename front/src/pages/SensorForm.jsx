import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaComponent from "../components/MapaComponent";

const SensorForm = () => {
  const [formData, setFormData] = useState({
    identificador: "",
    porcentajeBateria: "",
    latitud: "",
    longitud: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      latitud: isNaN(parseFloat(formData.latitud))
        ? null
        : parseFloat(formData.latitud),
      longitud: isNaN(parseFloat(formData.longitud))
        ? null
        : parseFloat(formData.longitud),
    };

    try {
      const response = await fetch("http://localhost:8000/sensores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sensor creado:", data);
        navigate("/sensores");
      } else {
        console.error("Error al crear el sensor");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Crear Sensor</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="identificador" className="form-label">
                  Identificador
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="identificador"
                  name="identificador"
                  value={formData.identificador}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="porcentajeBateria" className="form-label">
                  Porcentaje de Batería
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="porcentajeBateria"
                  name="porcentajeBateria"
                  value={formData.porcentajeBateria}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Fila para Latitud y Longitud */}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="latitud" className="form-label">
                  Latitud
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="latitud"
                  name="latitud"
                  value={formData.latitud}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="longitud" className="form-label">
                  Longitud
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="longitud"
                  name="longitud"
                  value={formData.longitud}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <MapaComponent setFormData={setFormData} />
          </form>
          <div className="card-body d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Crear Sensor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorForm;
