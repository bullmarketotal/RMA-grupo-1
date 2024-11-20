import React, { useMemo } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import "../../assets/font-awesome/css/font-awesome.min.css";
import { LoadingSpinner } from "../atoms";
import { GraphNivel, GraphTemp } from "../molecules";
import { useFetchNodoData } from "../../hooks";
import { useEffect, useState } from "react";

const NodoCard = ({ nodo }) => {
  const [dataTemp, setDataTemp] = useState([]);
  const [dataNivel, setDataNivel] = useState([]);
  const [dataTension, setDataTension] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const dateOf24hoursBefore = new Date(Date.now() - 1000 * 60 * 60 * 24);

  const stringOfDateOf24hoursBefore = dateOf24hoursBefore.toISOString();

  const fetchData = async (type) => {
    const response = await fetch(
      `${API_URL}/paquetes?nodo_id=${nodo.id}&type=${type}&limit=200`
    );
    return response.json();
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchData(1), fetchData(25), fetchData(16)])
      .then(([temp, nivel, tension]) => {
        console.log("temp:", temp);
        console.log("nivel:", nivel);
        setDataTemp(temp);
        setDataNivel(nivel);
        setDataTension(tension);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
                {dataNivel &&
                dataNivel.items &&
                dataNivel.items.length > 0 &&
                dataNivel.info.total_items !== 0
                  ? dataNivel.items[
                      dataNivel.info.total_items - 1
                    ].data.toFixed(2)
                  : "--"}{" "}
                m
              </span>

              <span className="flex items-center">
                <i className="fa fa-thermometer text-rose-500 mx-2" />
                {dataTemp &&
                dataTemp.items &&
                dataTemp.items.length > 0 &&
                dataTemp.info.total_items !== 0
                  ? dataTemp.items[dataTemp.info.total_items - 1].data.toFixed(
                      2
                    )
                  : "--"}{" "}
                ºC
              </span>

              <span className="flex items-center mx-2">
                <BsFillLightningChargeFill />
                {dataTension &&
                dataTension.items &&
                dataTension.items.length > 0 &&
                dataTension.info.total_items !== 0
                  ? dataTension.items[
                      dataTension.info.total_items - 1
                    ].data.toFixed(2)
                  : "--"}{" "}
                V
              </span>
            </div>
          )}

          <div className="">
            <a
              href={"/sensor/1"}
              className="roboto-medium mt-16 bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200"
            >
              VER DATOS
            </a>
          </div>
        </div>
        {!loading ? (
          <div className="sm:flex sm:flex-col md:flex-row justify-end w-full hidden">
            <div className="md:h-full md:w-1/2 w-full">
              <GraphTemp data={dataTemp.items} syncId={nodo.id} />
            </div>
            <div className="md:h-full md:w-1/2 w-full">
              <GraphNivel
                data={dataNivel.items}
                noBrush={true}
                syncId={nodo.id}
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
