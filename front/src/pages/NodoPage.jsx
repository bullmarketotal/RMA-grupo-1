import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { NodoDataVisualizer, NodoInfo } from "../components/organisms";
import { useFetchSensorData } from "../hooks";
import { PDFNodo } from "../components/molecules"; 

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false); 
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const chartRef = useRef(null);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleExportClick = () => {
    setIsExporting(true); 
    console.log("*********Exportacion iniciada, isExporting:", true);
  };

  const handleExportComplete = () => {
    setIsExporting(false); 
    console.log("---------Exportacion completada, isExporting:", false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  console.log("isExporting en NodoPage:", isExporting); 
  return (
    <Container>
      <Header title={"Nodo"} />

      
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

      <PDFNodo
        data={data}
        chartRef={chartRef}
        startDate={startDate}
        endDate={endDate}
        paquetes={data.paquetes}
        onExport={handleExportClick} 
        onExportComplete={handleExportComplete} 
        isExporting={isExporting} 
      />
    </Container>
  );
};

export default NodoPage;
