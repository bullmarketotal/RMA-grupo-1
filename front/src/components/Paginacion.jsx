import React from "react";

const Paginacion = ({
  page,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  loading,
}) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button
        className="btn btn-primary"
        onClick={handlePreviousPage}
        disabled={page === 1 || loading}
      >
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button
        className="btn btn-primary"
        onClick={handleNextPage}
        disabled={page === totalPages || loading}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
