import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFNodo = ({ data, chartRef, startDate, endDate, onExport, onExportComplete, isExporting }) => {
  useEffect(() => {
    const capturePDF = async () => {
      const filtroElement = document.getElementById("filtro-datos");
      if (filtroElement) {
        filtroElement.style.display = "none";
      }

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Información de Nodo", 10, 10);

      doc.setFontSize(12);
      doc.text(`Rango de fechas: ${startDate || "No especificado"} a ${endDate || "No especificado"}`, 10, 20);

      doc.text(`Latitud: ${data.sensor.latitud}`, 10, 30);
      doc.text(`Longitud: ${data.sensor.longitud}`, 10, 40);

      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current);
        const chartImage = canvas.toDataURL("image/png");

        doc.addImage(chartImage, "PNG", 10, 50, 180, 100); 
      }

      doc.save("nodo_data.pdf");

      if (filtroElement) {
        filtroElement.style.display = "";
      }
      onExportComplete();
    };

    if (isExporting) {
      capturePDF();
    }
  }, [isExporting, chartRef, data, startDate, endDate, onExportComplete]);

  const handleExportClick = () => {
    onExport(); 
  };

  return (
    <button onClick={handleExportClick} className="btn btn-primary mt-4">
      Exportar a PDF
    </button>
  );
};

export default PDFNodo;
