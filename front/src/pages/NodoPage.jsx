import React, { useMemo, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Header,
  LoadingSpinner,
  MiniMap,
} from "../components/atoms";
import {
  MaxLevelCard,
  NodoHeader,
  NodoRecentDataCard,
} from "../components/molecules";
import { NodoDataVisualizer } from "../components/organisms";
import { useFetchSensorData } from "../hooks";
import PDFNodo from "../components/molecules/PDFNodo"; 
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer"; 

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false); 
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const chartRef = useRef(null);
  const bateriaChartRef = useRef(null); 

  const sensorData = useMemo(() => data?.sensor, [data?.sensor]);
  const paquetesData = useMemo(() => data?.paquetes, [data?.paquetes]);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleExportClick = () => {
    setIsExporting(true); 
    console.log("*********Exportación iniciada, isExporting:", true);
  };

  const handleExportComplete = () => {
    setIsExporting(false); // Cambiar isExporting a false cuando la exportación termina
    console.log("---------Exportación completada, isExporting:", false);
  };

  // Mostrar el LoadingSpinner si los datos están cargando o si la exportación está en progreso
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  const { latitud, longitud } = sensorData;

  return (
    <Container>
      <Header title={"Nodo"} />
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80 pb-4">
          <div className="col-span-2">
            <NodoHeader sensor={sensorData} />
          </div>
          <div className="row-span-2 shadow-sm rounded-lg overflow-hidden w-full h-full min-h-64">
            <MiniMap lat={latitud} lng={longitud} />
          </div>
          <div className="col-span-2 flex gap-4 items-center">
            <div className="w-1/2">
              <NodoRecentDataCard data={paquetesData} />
            </div>
            <div className="w-1/2 flex gap-4">
              <div className="w-1/2">
                <MaxLevelCard data={paquetesData} timeFrame={TIMEFRAME_7D} />
              </div>
              <div className="w-1/2">
                <MaxLevelCard data={paquetesData} timeFrame={TIMEFRAME_24H} />
              </div>
            </div>
          </div>

      {/* Mostrar el spinner durante la exportación */}
      {isExporting && <LoadingSpinner />}

      <div id="main">
        <div className="card-body">
          <NodoInfo data={data} loading={loading} />
        </div>
      </div>

      <div ref={chartRef}>
        <NodoDataVisualizer
          data={data}
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
          data={data}
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
