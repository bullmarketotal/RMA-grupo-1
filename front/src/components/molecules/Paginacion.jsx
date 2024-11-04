import React from "react";

const Paginacion = ({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
}) => {
  const itemsPerPageValue = itemsPerPage || 15;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPageValue));
  const maxVisibleButtons = 10;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const getVisiblePageNumbers = () => {
    const visiblePages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (startPage > 1) {
      visiblePages.unshift("...");
    }

    if (endPage < totalPages) {
      visiblePages.push("...");
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePageNumbers();

  return (
    <nav className="flex justify-between items-center w-full">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`btn-action ${
          currentPage === 1 ? "btn-disabled" : "btn-enabled"
        }`}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {/* Botones de Páginas */}
      <div className="flex-1 flex justify-center overflow-x-auto">
        <ul className="flex space-x-2">
          {visiblePages.map((page, index) => (
            <li key={index} className="list-none">
              <button
                onClick={() => handlePageChange(page)}
                className={`btn ${
                  currentPage === page ? "btn-active" : "btn-inactive"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-md transition-colors duration-300 ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-200 dark:bg-gray-800"
            : "bg-sky-500 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white dark:text-gray-200"
        }`}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Paginacion;
