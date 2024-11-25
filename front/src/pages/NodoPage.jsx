import React, { useMemo, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, LoadingSpinner, MiniMap } from "../components/atoms";
import {
  MaxLevelCard,
  NodoHeader,
  NodoRecentDataCard,
} from "../components/molecules";
import { NodoDataVisualizer } from "../components/organisms";
import { useFetchNodoData, useNodos } from "../hooks";
import PDFNodo from "../components/molecules/PDFNodo";
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer";
import TestComponent from "./TestComponent";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);
  const [dataNivel, setDataNivel] = useState([]);
  const [dataTension, setDataTension] = useState([]);

  const { data, loading, error } = useFetchNodoData({
    offset: 1,
    nodo_id: id,
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    order: "asc",
    orderBy: "date",
  });
  console.log("ID: ", id);

  const {
    nodos: sensorData,
    loading: loadingNodo,
    error: errorNodo,
  } = useNodos({
    nodo_id: id,
  });

  useEffect(() => {
    if (data && Array.isArray(data.items)) {
      const temp = data.items.filter((item) => item.type_id === 1); // Tipo 1: Temperatura
      const nivel = data.items.filter((item) => item.type_id === 25); // Tipo 25: Nivel
      const tension = data.items.filter((item) => item.type_id === 16); // Tipo 16: Tensión

      setDataTemp(temp);
      setDataNivel(nivel);
      setDataTension(tension);
    } else {
      console.warn("Datos inesperados:", data);
    }
  }, [data]);

  //Convertir .data de nivel hidrometrico de cm a m y redondear a 2 decimales
  const processedDataNivel = dataNivel.map((punto) => ({
    ...punto,
    data: parseFloat((punto.data / 100).toFixed(2)),
  }));

  const chartRef = useRef(null);
  const bateriaChartRef = useRef(null);

  const paquetesData = useMemo(() => data?.items, [data?.items]);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleExportClick = () => {
    setIsExporting(true);
    console.log("*********Exportación iniciada, isExporting:", true);
  };

  const handleExportComplete = () => {
    setIsExporting(false);
    console.log("---------Exportación completada, isExporting:", false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  //const { latitud, longitud } = sensorData;
  if (loading || loadingNodo) return <LoadingSpinner />;

  return (
    <Container>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <div className="col-span-2 flex flex-col">
            <NodoHeader sensor={sensorData} loading={loadingNodo} />
          </div>
          <div className="row-span-2 shadow-sm rounded-lg overflow-hidden w-full max-h-80 min-h-64 flex justify-end">
            {latitud !== undefined && longitud !== undefined ? (
              <MiniMap lat={latitud} lng={longitud} />
            ) : (
              <LoadingSpinner />
            )}
            {sensorData.latitud !== undefined &&
            sensorData.longitud !== undefined ? (
              <MiniMap lat={sensorData.latitud} lng={sensorData.longitud} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className="col-span-2 flex gap-4 items-center">
            <div className="w-1/2">
              <NodoRecentDataCard
                dataTemp={dataTemp}
                dataNivel={processedDataNivel}
              />
            </div>
            <div className="w-1/2 flex gap-4">
              <div className="w-1/2">
                <MaxLevelCard
                  data={processedDataNivel}
                  timeFrame={TIMEFRAME_7D}
                />
              </div>
              <div className="w-1/2">
                <MaxLevelCard
                  data={processedDataNivel}
                  timeFrame={TIMEFRAME_24H}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isExporting && <LoadingSpinner />}

      <div ref={chartRef}>
        <NodoDataVisualizer
          dataNivel={dataNivel}
          dataTemp={dataTemp}
          loading={loading}
          onFilterChange={handleFilterChange}
          showFiltro={!isExporting}
          isExporting={isExporting}
        />
      </div>

      <div
        ref={bateriaChartRef}
        style={{ display: isExporting ? "block" : "none" }}
      >
        <BateriaDataVisualizer
          data={paquetesData}
          loading={loading}
          onFilterChange={handleFilterChange}
          isExporting={isExporting}
        />
      </div>

      <PDFNodo
        data={data}
        chartRef={chartRef}
        bateriaChartRef={bateriaChartRef}
        startDate={startDate}
        endDate={endDate}
        onExport={handleExportClick}
        onExportComplete={handleExportComplete}
        isExporting={isExporting}
      />
    </Container>
  );
};

export default NodoPage;
