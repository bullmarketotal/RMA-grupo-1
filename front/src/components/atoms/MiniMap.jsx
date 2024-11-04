import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";

// Configuración del icono marcador
const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// Configuración del zoom inicial
const ZOOM = 12;
const MAX_ZOOM = 17;
const MIN_ZOOM = 11;
function MiniMap({ lat, lng }) {
  const bounds = [
    [lat, lng],
    [lat, lng],
  ];

  return (
    <div
      style={{
        cursor: "pointer",
        width: "100%",
        height: "100%",
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={ZOOM}
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
        style={{
          width: "100%",
          height: "100%",
        }}
        attributionControl={false}
        zoomControl={false}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsVisibilty={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}

export default MiniMap;
