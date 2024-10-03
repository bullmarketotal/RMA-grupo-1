import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Form() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Formulario de Clima y Nivel Hidrométrico
      </h1>
      <form id="clima-form">
        <div className="mb-3">
          <label htmlFor="clima" className="form-label">
            Estado del Clima:
          </label>
          <select id="clima" name="clima" className="form-select" required>
            <option value="">Seleccione...</option>
            <option value="soleado">Soleado</option>
            <option value="nublado">Nublado</option>
            <option value="lluvioso">Lluvioso</option>
            <option value="ventoso">Ventoso</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="nivel-hidrometrico" className="form-label">
            Nivel Hidrométrico (cm):
          </label>
          <input
            type="number"
            id="nivel-hidrometrico"
            name="nivel-hidrometrico"
            className="form-control"
            required
            min="0"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
