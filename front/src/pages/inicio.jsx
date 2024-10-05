import React from "react";
import logoCooperativa from "../images/cooperativa.logo.png"; // Importa la imagen
import logoUNPSJB from "../images/unpsjb.png"; // Importa la imagen
import "./inicio.css";

const Inicio = () => {
  return (
    <div className="inicio">
      <div className="header">
        <h2>
          Demo de aplicacion web para Red de monitoreo de la Cuenca Inferior del
          Río Chubut.
        </h2>
        <div className="images">
          <img src={logoUNPSJB} alt="Imagen 2" />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
