import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { Container, Header } from "../components/atoms";
import { MapaComponent } from "../components/molecules";

const SensorForm = () => {
  const [formData, setFormData] = useState({
    identificador: "",
    porcentajeBateria: "",
    latitud: "",
    longitud: "",
    descripcion: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        const newSensor = await response.json();
        showNotification("¡Nodo creado exitosamente!", "success");
        navigate(`/sensor/${newSensor.id}`);
      } else {
        showNotification("Error al crear el sensor.", "error");
      }
    } catch (error) {
      showNotification("Error al enviar la solicitud.", "error");
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header title="Crear Nodo" />
      <div className="normal-bg normal-text flex w-full justify-center items-center">
        <div className="px-2 py-3 w-full max-w-5xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              <div>
                <label
                  htmlFor="identificador"
                  className="block text-sm font-medium"
                >
                  Identificador:
                </label>
                <input
                  type="text"
                  className="input-text h-full w-full"
                  id="identificador"
                  name="identificador"
                  value={formData.identificador}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="porcentajeBateria"
                  className="block text-sm font-medium"
                >
                  Porcentaje de Batería:
                </label>
                <input
                  type="number"
                  className="input-text h-full w-full"
                  id="porcentajeBateria"
                  name="porcentajeBateria"
                  value={formData.porcentajeBateria}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              {/* Latitud */}
              <div>
                <label htmlFor="latitud" className="block text-sm font-medium">
                  Latitud:
                </label>
                <input
                  type="number"
                  className="input-text h-full w-full"
                  id="latitud"
                  name="latitud"
                  value={formData.latitud}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Longitud */}
              <div>
                <label htmlFor="longitud" className="block text-sm font-medium">
                  Longitud:
                </label>
                <input
                  type="number"
                  className="input-text h-full w-full"
                  id="longitud"
                  name="longitud"
                  value={formData.longitud}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-8">
              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium"
                >
                  Descripción:
                </label>
                <textarea
                  className="input-text h-full w-full"
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  maxLength={256}
                  rows={4}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {256 - formData.descripcion.length} caracteres restantes
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-md overflow-hidden shadow">
              <MapaComponent setFormData={setFormData} />
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Crear Nodo"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SensorForm;
