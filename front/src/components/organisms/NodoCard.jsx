import React, { useMemo } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import "../../assets/font-awesome/css/font-awesome.min.css";
import { LoadingSpinner } from "../atoms";
import { GraphNivel, GraphTemp } from "../molecules";
import { useFetchNodoData } from "../../hooks";

const NodoCard = ({ nodo }) => {
  console.log(nodo);
  const dateOf24hoursBefore = useMemo(
    () => new Date(Date.now() - 1000 * 60 * 60 * 24),
    []
  );
  const stringOfDateOf24hoursBefore = dateOf24hoursBefore.toISOString();

  const { data, loading, error, isForbidden, mutate } = useFetchNodoData({
    nodo_id: nodo.id,
    filterStartDate: stringOfDateOf24hoursBefore,
  });

  return (
    <div className="roboto border-2 rounded-2xl p-3 dark:border-neutral-800 dark:text-neutral-50">
      <div className="flex">
        <div className="w-1/3 min-w-64">
          <h4 className="card-title flex items-center text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-semibold">
            <MdOutlineSettingsInputAntenna className="mr-2" />{" "}
            {nodo.identificador}
          </h4>
          <p className="normal-text text-sm py-2 mb-1">{nodo.descripcion}</p>
          <span className="text-xs sm:text-sm text-neutral-600">
            <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
            <b>Latitud: </b>
            {nodo.latitud ? nodo.latitud.toFixed(5) : "N/A"}, <b>Longitud: </b>{" "}
            {nodo.longitud ? nodo.longitud.toFixed(5) : "N/A"}
          </span>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center normal-text text-xl font-medium my-4 -ml-2">
              <span className="flex items-center">
                <i className="fa fa-tint text-sky-500 mx-2" />
                {data.length !== 0
                  ? data[data.length - 1].nivel_hidrometrico.toFixed(2)
                  : "--"}{" "}
                m
              </span>

              <span className="flex items-center">
                <i className="fa fa-thermometer text-rose-500 mx-2" />
                {data.length !== 0
                  ? data[data.length - 1].temperatura.toFixed(1)
                  : "--"}{" "}
                ºC
              </span>
              <span className="flex items-center mx-2">
                <BsFillLightningChargeFill />
                {2.2} V
              </span>
            </div>
          )}

          <div className="">
            <a
              href={"/sensor/" + nodo.id}
              className="roboto-medium mt-16 bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200"
            >
              VER DATOS
            </a>
          </div>
        </div>
        {!loading ? (
          <div className="sm:flex sm:flex-col md:flex-row justify-end w-full hidden">
            <div className="md:h-full md:w-1/2 w-full">
              <GraphTemp data={data} syncId={nodo.id} />
            </div>
            <div className="md:h-full md:w-1/2 w-full">
              <GraphNivel data={data} noBrush={true} syncId={nodo.id} />
            </div>
          </div>
        ) : (
          <div className="md:col-span-8 d-flex justify-content-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default NodoCard;
