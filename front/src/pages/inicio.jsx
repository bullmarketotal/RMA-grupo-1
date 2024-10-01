import React from 'react';
import logo from '../images/cooperativa.logo.png'; // Importa la imagen
import "./inicio.css"

const Inicio = () => {
    return(
        <div className="inicio">
        <h2>Proyecto de red de monitoreo para cuenca</h2>
        <div className="images">
            <img src={logo} alt="Imagen 1" />
            <img src={logo} alt="Imagen 2" />
        </div>
        </div>
  );
};

export default Inicio; // Asegúrate de tener esta línea