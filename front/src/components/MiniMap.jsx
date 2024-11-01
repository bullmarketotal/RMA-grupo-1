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
const ZOOM = 10;

function MiniMap({ lat, lng }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMapSize = () => setIsExpanded(!isExpanded);

  return (
    <div
      onClick={toggleMapSize}
      style={{
        cursor: "pointer",
        width: "100%",
        height: "100%",
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={ZOOM}
        style={{
          width: "100%",
          height: "100%",
        }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, lng]} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}

export default MiniMap;
