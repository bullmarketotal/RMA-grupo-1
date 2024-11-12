import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import React, { useEffect, useState } from "react";
import "../../assets/font-awesome/css/font-awesome.min.css";
import { GraphNivel, GraphTemp,  } from "../molecules";
import { LoadingSpinner } from "../atoms";
import { BsFillLightningChargeFill } from "react-icons/bs";


const NodoCard = ({ sensor }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const dateOf24hoursBefore = new Date(Date.now() - 1000 * 60 * 60 * 24);

  const stringOfDateOf24hoursBefore = dateOf24hoursBefore.toISOString();

  useEffect(() => {
    fetch(
      `${API_URL}/paquetes?start_date=${stringOfDateOf24hoursBefore}&end_date=${new Date().toISOString()}&sensor_id=${
        sensor.id
      }&limit=200`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className="roboto border-2 rounded-2xl p-3 dark:border-neutral-800 dark:text-neutral-50">
      <div className="flex">
        <div className="w-1/3 min-w-64">
          <h4 className="card-title flex items-center text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-semibold">
            <MdOutlineSettingsInputAntenna className="mr-2" />{" "}
            {sensor.identificador}
          </h4>
          <p className="normal-text text-sm py-2 mb-1">{sensor.descripcion}</p>
          <span className="text-xs sm:text-sm text-neutral-600">
            <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
            <b>Latitud: </b>
            {sensor.latitud.toFixed(5)}, <b>Longitud: </b>{" "}
            {sensor.longitud.toFixed(5)}
          </span>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center normal-text text-xl font-medium my-4 -ml-2">
              {/* Temperatura */}
              <span className="flex items-center">
                <i className="fa fa-tint text-sky-500 mx-2" />
                {data[data.length - 1].nivel_hidrometrico.toFixed(2)} m
              </span>
              {/* Nivel Hidrometrico */}
              <span className="flex items-center">
                <i className="fa fa-thermometer text-rose-500 mx-2" />
                {data[data.length - 1].temperatura.toFixed(1)} ºC
              </span>
              <span className="flex items-center mx-2">
                <BsFillLightningChargeFill/>
                {2.2} V
              </span>
            </div>
          )}
          <div className="">
            <a
              href={"/sensor/" + sensor.id}
              className="roboto-medium mt-16 bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200"
            >
              VER DATOS
            </a>
          </div>
        </div>
        {!loading ? (
          <div className="sm:flex sm:flex-col md:flex-row justify-end w-full hidden">
            <div className="md:h-full md:w-1/2 w-full">
              <GraphTemp data={data} syncId={sensor.id}/>
            </div>
            <div className="md:h-full md:w-1/2 w-full">
              <GraphNivel
                data={data}
                noBrush={true}
                syncId={sensor.id}
              ></GraphNivel>
            </div>
          </div>
        ) : (
          <div className="md:col-span-8 d-flex justify-content-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default NodoCard;
