import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFNodo = ({ data, chartRef, bateriaChartRef, startDate, endDate, onExport, onExportComplete, isExporting }) => {
  useEffect(() => {
    console.log("Data PDF:", data)
    const capturePDF = async () => {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 10;
      const lineHeight = 6;

      const splitText = (text, maxWidth) => {
        return doc.splitTextToSize(text, maxWidth);
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`Informe de Nodo: ${data.identificador}`, marginX, 15);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const descripcionLines = splitText(data.descripcion, pageWidth - marginX * 2);
      doc.text(descripcionLines, marginX, 25);

      doc.setDrawColor(200, 200, 200); 
      doc.line(marginX, 32 + descripcionLines.length * lineHeight, pageWidth - marginX, 32 + descripcionLines.length * lineHeight);
      let currentY = 40 + descripcionLines.length * lineHeight;
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Detalles del Nodo:", marginX, currentY);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      currentY += 10;
      if (startDate && endDate) {
        doc.text(`Rango de fechas: ${startDate} - ${endDate}`, marginX, currentY);
      }
      currentY += 10;
      doc.text("Posición del Nodo:", marginX, currentY);
      doc.text(`Latitud: ${data.latitud}`, marginX + 10, currentY + 10);
      doc.text(`Longitud: ${data.longitud}`, marginX + 90, currentY + 10);
      currentY += 20;

      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current);
        const chartImage = canvas.toDataURL("image/png");
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Gráfico de Datos:", marginX, currentY);
        doc.addImage(chartImage, "PNG", marginX, currentY + 10, pageWidth - marginX * 2, 80);
        currentY += 100;
      }

      if (bateriaChartRef.current) {
        const canvas = await html2canvas(bateriaChartRef.current, { scale: 2 });
        const batteryChartImage = canvas.toDataURL("image/png");
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Gráfico de Batería:", marginX, currentY);
        doc.addImage(batteryChartImage, "PNG", marginX, currentY + 10, pageWidth - marginX * 2, 80);
      }

      doc.save(`nodo_${data.identificador}_data.pdf`);
      onExportComplete();
    };

    if (isExporting) {
      capturePDF();
    }
  }, [isExporting, chartRef, bateriaChartRef, data, startDate, endDate, onExportComplete]);

  return (
    <button onClick={onExport} className="btn btn-primary mt-4">
      Exportar a PDF
    </button>
  );
};

export default PDFNodo;
