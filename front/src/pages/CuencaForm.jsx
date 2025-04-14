import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { Container, Header, SubmitButton } from "../components/atoms";
import { MapaComponent } from "../components/molecules";

const CuencaForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
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
    };

    try {
      const response = await fetch("http://localhost:8000/cuencas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Error al crear la cuenca");

      showNotification("¡Cuenca creada exitosamente!", "success");
      navigate("/sensores");
    } catch (error) {
      showNotification("Error al crear la cuenca.", "error");
      console.error("Error al crear la cuenca:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header title="Crear Cuenca" />
      <div className="normal-bg normal-text flex w-full justify-center items-center">
        <div className="px-2 py-3 w-full max-w-5xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              <div>
                <label htmlFor="identificador" className="block text-sm font-medium">
                  Identificador/Nombre:
                </label>
                <input
                  type="text"
                  className="input-text h-10 w-full"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-8">
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium">Descripción:</label>
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
            <div className="flex justify-center mt-6">
              <SubmitButton isSubmitting={isSubmitting} name={"Crear Cuenca"} />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CuencaForm;
