import React, { useState } from "react";
import TablaDatos from "../components/TablaDatos";
import Paginacion from "../components/Paginacion";
import LoadingSpinner from "../components/LoadingSpinner";
import "../components/styles.css";

const TableView = ({ data, loading }) => {
  const itemsPerPage = 15;
  const totalItems = data.paquetes.length;
  const identificador = data.sensor.identificador;

  const newData = data.paquetes.map((item) => ({
    ...item,
    identificador,
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const getVisibleData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return newData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {loading ? <LoadingSpinner /> : <TablaDatos items={getVisibleData()} />}

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(TableView); // Evita renderizados innecesarios
