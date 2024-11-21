import "leaflet/dist/leaflet.css";
import React from "react";
import { useFetchSensores, useLoadNodos, useMapInstance } from "../../hooks";
import { LoadingDots } from "../atoms";
import { useNodos } from "../../hooks";

const MapaDeNodos = () => {
  const { nodos, loading, error } = useNodos();
  const limites = [
    [-42.342, -62.145], // suroeste
    [-45.594, -71.54], // noreste
  ];

  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 10;

  const map = useMapInstance(posicionInicial, zoomInicial, limites);

  useLoadNodos(map, nodos, API_URL);

  return (
    <section>
      {loading && <LoadingDots />}
      <div id="map" className="m-auto aspect-video w-full dark:dark-map"></div>
    </section>
  );
};

export default MapaDeNodos;
