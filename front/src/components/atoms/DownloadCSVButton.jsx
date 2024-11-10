import React from 'react';

// Función para generar el CSV
const generateCSV = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log("No hay datos para generar el CSV.");
    return ''; // Si los datos no son válidos o están vacíos, no hacemos nada
  }

  // Asegurémonos de que el primer elemento sea un objeto
  if (typeof data[0] !== 'object' || data[0] === null) {
    console.log("El primer elemento no es un objeto válido:", data[0]);
    return ''; // Si el primer elemento no es un objeto, no generamos el CSV
  }

  const header = Object.keys(data[0]); // Obtener las claves del primer objeto
  console.log("Cabecera del CSV:", header); // Verificar la cabecera generada

  const rows = data.map((row) =>
    header.map((field) => `"${row[field]}"`).join(",") // Crear cada fila con los datos correspondientes
  );

  // Verificar las filas generadas
  console.log("Filas generadas:", rows);

  return [header.join(","), ...rows].join("\n"); // Unir la cabecera y las filas en un solo string
};

// Función para descargar el archivo CSV
const downloadCSV = (data) => {
  console.log("Generando CSV con los datos:", data);  // Verificar qué datos se están pasando
  const csv = generateCSV(data);
  console.log("CSV generado:", csv); // Verificar el contenido del CSV generado

  if (!csv) {
    console.log("No se generó el CSV, no se puede descargar.");
    return; // Si no se generó el CSV, no hacemos nada
  }

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "datos.csv"; // Nombre del archivo descargado
  a.click();
  URL.revokeObjectURL(url); // Limpiar el URL generado
};

const DownloadCSVButton = ({ data, disabled }) => {
  const handleDownload = () => {
    console.log("Descargando CSV...");
    
    // Acceder a la propiedad 'paquetes' si existe
    const paquetes = data?.paquetes || []; // Si no existe, pasamos un array vacío
    console.log("Datos para generar el CSV:", paquetes); // Verificar los datos que pasamos

    downloadCSV(paquetes); // Pasar 'paquetes' a la función
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleDownload}
      disabled={disabled || !data || !data.paquetes || data.paquetes.length === 0}
    >
      Descargar CSV
    </button>
  );
};

export default DownloadCSVButton;