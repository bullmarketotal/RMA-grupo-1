import React from "react";

const Paginacion = ({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
}) => {
  // Asegúrate de que itemsPerPage tenga un valor predeterminado
  const itemsPerPageValue = itemsPerPage || 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPageValue));

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="page-link"
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              onClick={() => handlePageChange(index + 1)}
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="page-link"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacion;
