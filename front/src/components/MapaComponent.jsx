import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapaComponent = ({ setFormData }) => {
  useEffect(() => {
    // Verifica si el mapa ya está inicializado y lo destruye si es necesario
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null; // Elimina el ID del mapa para evitar conflictos
    }

    const map = L.map("map").setView([-43.248953, -65.305053], 15); // Coordenadas iniciales

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map);

    // Actualiza las coordenadas al hacer clic en el mapa
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]); // Mueve el marcador
      setFormData((prev) => ({ ...prev, latitud: lat, longitud: lng })); // Actualiza los campos del formulario
    });

    // Limpia el mapa cuando el componente se desmonte
    return () => {
      map.remove();
    };
  }, [setFormData]);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default MapaComponent;
