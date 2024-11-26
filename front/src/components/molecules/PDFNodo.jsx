import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const mesesEsp = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

const PDFNodo = ({ data, chartRef, bateriaChartRef, startDate, endDate, onExport, onExportComplete, isExporting }) => {
  useEffect(() => {
    const capturePDF = async () => {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 10;
      const lineHeight = 6;

      const splitText = (text, maxWidth) => {
        return doc.splitTextToSize(text, maxWidth);
      };

      // Titulo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(`Informe de Nodo: ${data.identificador}`, marginX, 15);

      // Ubicacion
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Latitud: ${data.latitud} - Longitud: ${data.longitud}`, marginX, 20);
      
      let currentY = 25
      
      // Descripcion
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const descripcionLines = splitText(data.descripcion, pageWidth - marginX * 2);
      doc.text(descripcionLines, marginX, currentY);
      
      
      
      // linea separadora
      currentY += 5;
      doc.setDrawColor(200, 200, 200); 
      doc.line(marginX, currentY, pageWidth - marginX, currentY);
      
      currentY += 10
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const hoy = new Date()
      const introductionLines = splitText(`Informe generado para el nodo ${data.identificador} (Nº ${data.id}) al ${hoy.getDate()} de ${mesesEsp[hoy.getMonth()]} del ${hoy.getFullYear()}.`, pageWidth - marginX * 2) 
      doc.text(introductionLines, marginX, currentY);

      currentY += 15
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current);
        const chartImage = canvas.toDataURL("image/png");
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Gráfico de Datos", marginX, currentY);
        doc.addImage(chartImage, "PNG", marginX, currentY + 10, pageWidth - marginX * 2, 80);
        currentY += 100;
      }

      if (bateriaChartRef.current) {
        const cropHeight = 120
        const originalCanvas = await html2canvas(bateriaChartRef.current, { scale: 2 });
      
        // Crear un nuevo canvas con altura reducida en 20px
        const croppedCanvas = document.createElement('canvas');
        const context = croppedCanvas.getContext('2d');
        croppedCanvas.width = originalCanvas.width;
        croppedCanvas.height = originalCanvas.height - cropHeight;
      
        // Recortar la parte superior del canvas original
        context.drawImage(originalCanvas, 0, cropHeight, originalCanvas.width, originalCanvas.height - cropHeight, 0, 0, croppedCanvas.width, croppedCanvas.height);
      
        const batteryChartImage = croppedCanvas.toDataURL("image/png");
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Gráfico de Batería", marginX, currentY);
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
