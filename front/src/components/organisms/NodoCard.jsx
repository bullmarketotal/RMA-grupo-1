import React, { useMemo, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../assets/font-awesome/css/font-awesome.min.css";
import { LoadingSpinner, LinkComponent } from "../atoms";
import { GraphNivel, GraphTemp } from "../molecules";
import { useFetchNodoData } from "../../hooks";

const NodoCard = ({ nodo }) => {
  const breadcrumbPath = [
    { label: "Home", path: "/" },
    { label: "Lista de Nodos", path: "/lista-nodos" },
    { label: `Nodo ${nodo.identificador}`, path: `/nodo/${nodo.id}` },
  ];
  const now = useMemo(() => new Date(), []);

  const past24Hours = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  const nowISOString = now.toISOString();

  const {
    data: paqueteResponse,
    loading: loadingData,
    error,
    isForbidden,
    mutate,
  } = useFetchNodoData({
    nodo_id: nodo.id,
    filterStartDate: past24Hours,
    filterEndDate: nowISOString,
    orderBy: "date",
  });

  const { info, items = [] } = paqueteResponse || { info: {}, items: [] };

  const dataTemp = items.filter((item) => item.type_id === 1);
  const dataNivel = items.filter((item) => item.type_id === 25);
  const dataTension = items.filter((item) => item.type_id === 16);

  if (error) return <p>Error al obtener los datos: {error.message}</p>;
  if (isForbidden) return <p>Acceso prohibido.</p>;

  return (
    <div className="roboto border-2 rounded-2xl p-3 dark:border-neutral-800 dark:text-neutral-50">
      <div className="flex">
        <div className="w-1/3 min-w-64">
          <h4 className="card-title flex items-center text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-semibold">
            <MdOutlineSettingsInputAntenna className="mr-2" />
            {nodo.identificador}
          </h4>
          <p className="normal-text text-sm py-2 mb-1">{nodo.descripcion}</p>
          <span className="text-xs sm:text-sm text-neutral-600">
            <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
            <b>Latitud: </b>
            {nodo.latitud ? nodo.latitud.toFixed(5) : "N/A"}, <b>Longitud: </b>
            {nodo.longitud ? nodo.longitud.toFixed(5) : "N/A"}
          </span>

          <div className="flex items-center normal-text text-xl font-medium my-4 -ml-2">
            <span className="flex items-center">
              <i className="fa fa-tint text-sky-500 mx-2" />
              {dataNivel.length > 0
                ? dataNivel[dataNivel.length - 1].data.toFixed(2)
                : "--"}
              m
            </span>

            <span className="flex items-center">
              <i className="fa fa-thermometer text-rose-500 mx-2" />
              {dataTemp.length > 0
                ? dataTemp[dataTemp.length - 1].data.toFixed(2)
                : "--"}
              ºC
            </span>

            <span className="flex items-center mx-2">
              <BsFillLightningChargeFill />
              {dataTension.length > 0
                ? dataTension[dataTension.length - 1].data.toFixed(2)
                : "--"}
              V
            </span>
          </div>

          <div className="">
            <LinkComponent
              to={`/sensor/${nodo.id}`}
              breadcrumbPath={breadcrumbPath}
              className="roboto-medium mt-16 bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200"
            >
              VER DATOS
            </LinkComponent>
          </div>
        </div>
        <div className="sm:flex sm:flex-col md:flex-row justify-end w-full hidden">
          {loadingData ? (
            <div className="md:col-span-8 d-flex justify-content-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="md:h-full md:w-1/2 w-full">
                <GraphTemp data={dataTemp} syncId={nodo.id} />
              </div>
              <div className="md:h-full md:w-1/2 w-full">
                <GraphNivel data={dataNivel} noBrush={true} syncId={nodo.id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodoCard;
