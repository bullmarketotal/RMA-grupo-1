import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import useFetchSensores from "../../hooks/useFetchSensores";
import { useMapInstance } from "../../hooks/useMapInstance";
import { useLoadNodos } from "../../hooks/useLoadNodos";
import { LoadingDots } from "../atoms";

const API_URL = import.meta.env.VITE_API_URL;

export const MapaDeNodos = () => {
  const limites = [
    [-42.342, -62.145], // suroeste
    [-45.594, -71.54], // noreste
  ];

  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 10;
  
  const { data, loading, error } = useFetchSensores();
  const map = useMapInstance(posicionInicial, zoomInicial, limites);

  useLoadNodos(map, data, API_URL);

  return (
    <section>
      {loading && <LoadingDots/>}
      <div id="map" className="m-auto h-[600px] w-full"></div>
    </section>
  );
};
