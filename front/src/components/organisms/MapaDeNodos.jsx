import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import useNodos from "../../hooks/useNodos";
import { LoadingSpinner } from "../atoms";
import NodoMarker from "../molecules/NodoMarker";

const MapaDeNodos = () => {
  const { nodos, loading, error } = useNodos();

  const posicionInicial = [-43.39556845063809, -65.84930419921876];
  const zoomInicial = 10;
  return (
    <>
      <MapContainer
        center={posicionInicial}
        zoom={zoomInicial}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        attributionControl={false}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {!loading &&
          !error &&
          nodos.length > 0 &&
          nodos.map((nodo) => <NodoMarker key={nodo.id} nodo={nodo} />)}
      </MapContainer>
      {error && <p>Error al cargar los nodos: {error.message}</p>}
    </>
  );
};

export default MapaDeNodos;
