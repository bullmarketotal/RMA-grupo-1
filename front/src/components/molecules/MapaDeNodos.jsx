import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useFetchSensores from "../../hooks/useFetchSensores";
import { obtenerStringTiempoDesdeUltimoDato } from "../utils/date";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_CLASSES_FOR_MARKERS = " font-mono text-black p-2 border border-gray-800 shadow-md rounded-3xl font-serif text-sm hover:text-lg w-32 hover:w-36 text-center text-center transition-all duration-300"


export const MapaDeNodos = () => {
  const limites = [
    [-42.342, -62.145], // suroeste
    [-45.594, -71.54], // noreste
  ];

  const [map, setMap] = useState(null);

  
  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 10;
  
  const { data, loading, error } = useFetchSensores();

  useEffect(() => {
    if(!map || data?.length === 0)
      return;

    data.forEach(nodo => {
      const TODAY = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().substring(0, 10);

      const FETCH_URL = API_URL + `/paquetes?sensor_id=${nodo.id}&start_date=${TODAY}&end_date=${TODAY}`
      
      fetch(FETCH_URL)
      .then(res => res.json())
      .then(dataNodo => {
        let customIcon;

        // Caso sin datos hoy
        if(dataNodo.length === 0){
          customIcon = L.divIcon({
            className: '',
            html: `
            <div class="${BASE_CLASSES_FOR_MARKERS} bg-gray-400">
              <span class="text-xs text-nowrap text-ellipsis">${nodo.identificador}</span>
              <br/>
              <span class="font-bold">S/D</span>
            </div>`
          });
        } 
        // Caso con datos hoy
        else {

          const lastData = dataNodo[dataNodo.length - 1];

          const stringUltimoDato = obtenerStringTiempoDesdeUltimoDato(dataNodo);

          customIcon = L.divIcon({
            className: '',
            html: `<div class="${BASE_CLASSES_FOR_MARKERS} bg-gradient-to-tr from-blue-400 to-blue-600">
              <span class="text-xs text-nowrap text-ellipsis">${nodo.identificador}</span>
              <br/>
              <span class="font-bold text-base">${lastData .nivel_hidrometrico.toFixed(1)}m</span>
              <br/>
              <span class="text-[0.6rem] bold ">${stringUltimoDato}</span>
            </div>`
          });
        }

        const nodoMarker = L.marker([nodo.latitud, nodo.longitud], {
          icon: customIcon,
          draggable: false
        }).addTo(map);

        nodoMarker.on('click', () => {
          window.open(`/sensor/${nodo.id}`, '_blank');
        });
      })

    });

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
      <div id="map" className="m-auto h-[600px] w-full"></div>
    </section>
  );
};
