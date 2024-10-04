import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapaComponent = ({ setFormData }) => {
  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map").setView([-43.5042843, -65.7791978], 8); // Coordenadas iniciales

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map);

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setFormData((prev) => ({ ...prev, latitud: lat, longitud: lng }));
    });

    return () => {
      map.remove();
    };
  }, [setFormData]);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default MapaComponent;
