import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useFetchSensores from "../../hooks/useFetchSensores";



export const MapaDeNodos = () => {
  const limites = [
    [-42.342, -62.145], // suroeste
    [-45.594, -71.54], // noreste
  ];
  
  const addNodeToMap = (nodo, map) => {
    const newMarker = L.marker([nodo.latitud, nodo.longitud], { draggable: false, title: nodo.identificador }).addTo(map);
  }

  const [map, setMap] = useState(null);

  
  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 9;
  
  const { data, loading, error } = useFetchSensores();

  useEffect(() => {
    console.log('use effect', !map, data)
    if(!map || data?.length === 0)
      return;
    data.forEach(nodo => {
      console.log(nodo)
      addNodeToMap(nodo, map)
    })
  }, [data])

  
  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const mapInstance = L.map("map", {
      maxBounds: limites,
      minZoom: 7,
      maxBoundsViscosity: 0.1,
      attributionControl: false,
    }).setView(posicionInicial, zoomInicial);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance)

    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <section>
      <div id="map" className="m-auto h-[600px] w-4/5"></div>
    </section>
  );
};
