import { React, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function FiltroDatos({ onFilterChange }) {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  //aqui ocurre la magia
  const applyFilter = () => {
    onFilterChange(startDate, endDate);
  };

  return (
    <div className="flex items-center space-x-4 transition-colors duration-300 bg-zinc-50 dark:bg-gray-700">
      {/* Fecha Desde */}
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-gray-500 dark:text-gray-300" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="btn-inactive w-36 p-2 rounded-md"
          placeholder="Fecha de inicio"
        />
      </div>

      {/* Fecha Hasta */}
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-gray-500 dark:text-gray-300" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="btn-inactive w-36 p-2 rounded-md"
          placeholder="Fecha de fin"
        />
      </div>

      {/* Aplicar filtro */}
      <button
        className={`btn-action ${
          startDate && endDate ? "btn-active" : "btn-disabled"
        }`}
        disabled={!startDate || !endDate}
        onClick={applyFilter}
      >
        Aplicar Filtro
      </button>
    </div>
  );
}
