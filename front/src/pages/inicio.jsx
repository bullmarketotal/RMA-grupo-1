import React from "react";
import logoRMA from "../../logo.png";
import { MapaDeNodos } from "../components/molecules/MapaDeNodos";
import { Container } from "../components/atoms";

const Inicio = () => {
  return (
    <Container>
      <div className=" dark:bg-gray-900 dark:text-slate-50 text-center">
        <div className="header px-11 py-3 flex justify-center">
          <img
            src={logoRMA}
            alt="Imagen 2"
            className="size-8 sm:size-12 md:size-20 animate-spin-slow "
          />
          <h1 className="ml-10 h-24 antialiased roboto-bold dark:text-slate-50 uppercase sm:text-3xl md:text-5x1">
            Red de Monitoreo de la Cuenca <br />
            Inferior del Río Chubut
          </h1>
        </div>
        <div className="px-11 text-xl roboto-light">
          <hr className="mb-4"/>
          <p className="mb-3">
            En el mapa se visualiza el <b>último dato</b> obtenido para cada nodo de la
            red.
          </p>
          <p className="my-3 text-lg">
          Si no hubo datos hoy, estará en gris.
          </p>
          <p className="mb-3 text-lg">
            <b>Clickea el nodo</b> para acceder a una vista detallada de su información
            y datos.
          </p>
          
          <div className="mt-10 border-1 border-slate-400 drop-shadow-xl">
            <MapaDeNodos />
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Inicio;
