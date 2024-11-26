import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { CreateCustomIcon } from "../utils";
import useColorBasedOnAlert from "../../hooks/useColorBasedOnAlert";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../../context/BreadcrumbsContext";
import MarkerTooltip from "../atoms/MarkerTooltip";

const NodoMarker = ({ nodo }) => {
  const navigate = useNavigate();
  const { setBreadcrumbs } = useBreadcrumbs();
  const {alertColor, loadingColor, lastNivel} = useColorBasedOnAlert(nodo);

  const handleNavigate = (e) => {
    setBreadcrumbs([
      { label: "Home", path: "/" },
      { label: `Nodo ${nodo.identificador}`, path: `/sensor/${nodo.id}` },
    ]);
    navigate(`/sensor/${nodo.id}`);
    e.originalEvent.preventDefault();
  };
  if(loadingColor)
    return null
  return (
    <Marker
      key={nodo.id}
      position={[nodo.latitud, nodo.longitud]}
      icon={CreateCustomIcon(alertColor, <MdOutlineSettingsInputAntenna />)}
      eventHandlers={{
        preclick: handleNavigate,
      }}
    >
      <Tooltip className="leaflet-tooltip">
        <MarkerTooltip nodo={nodo} dataNodo={[lastNivel]}/>
      </Tooltip>
    </Marker>
  );
};

export default NodoMarker;
