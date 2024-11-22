import React, { useState } from "react";
import { useNodos } from "../../hooks/useNodos";
import { useNotification } from "../../context/NotificationContext";
import { MapaComponent } from "../molecules";

const FormularioNodo = ({ onClose }) => {
  const [formData, setFormData] = useState({
    identificador: "",
    porcentajeBateria: "",
    latitud: "",
    longitud: "",
    descripcion: "",
  });
  const { addNodo, loading } = useNodos();
  const { showNotification } = useNotification();

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
      await addNodo(dataToSend);
      showNotification("¡Nodo creado exitosamente!", "success");
      setFormData({
        identificador: "",
        porcentajeBateria: "",
        latitud: "",
        longitud: "",
        descripcion: "",
      });
      onClose();
    } catch (error) {
      showNotification("Error al crear el nodo.", "error");
      console.error("Error al crear el nodo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8 items-start">
        <div className="col-span-1 flex flex-col">
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium">
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
        <div className="col-span-1 flex items-start">
          <div className="w-full mt-0 lg:mt-10 rounded-md overflow-hidden shadow h-full">
            <MapaComponent setFormData={setFormData} />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          type="submit"
          className="bg-sky-500 text-white font-bold py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Nodo"}
        </button>
        <button
          type="button"
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioNodo;
