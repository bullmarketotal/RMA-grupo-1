import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { NodoDataVisualizer, NodoInfo } from "../components/organisms";
import { useFetchSensorData } from "../hooks";
import PDFNodo from "../components/molecules/PDFNodo"; 
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer"; 

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false); 
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const chartRef = useRef(null);
  const bateriaChartRef = useRef(null); 

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

  console.log("isExporting en NodoPage:", isExporting); 
  return (
    <Container>
      <Header title={"Nodo"} />

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
