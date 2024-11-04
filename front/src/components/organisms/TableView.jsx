import React, { useState } from "react";
import { LoadingSpinner } from "../atoms";
import { Paginacion, TablaDatos } from "../molecules";

const TableView = ({ data, loading }) => {
  const itemsPerPage = 25;
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
      />{" "}
    </div>
  );
};

export default TableView; // Evita renderizados innecesarios
