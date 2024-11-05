import React from "react";
import logoRMA from '../../logo.png';
import { MapaDeNodos } from "../components/molecules/MapaDeNodos";

const Inicio = () => {
  return (
    <>
      <div className="container mx-auto max-w-7xl pb-8 mt-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
        <div className="header p-3 flex justify-center">
          <img src={logoRMA} alt="Imagen 2" className="h-20 animate-spin-slow " />
          <h1 className="text-center align-middle ml-10 h-24 text-4xl antialiased font-bold dark:text-slate-50 uppercase">
            Red de Monitoreo de la Cuenca <br/>Inferior del Río Chubut
          </h1>
        </div>
      </div>
      <MapaDeNodos/>
    </>
  );
};

export default Inicio;
