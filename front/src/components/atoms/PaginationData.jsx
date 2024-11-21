import React from "react";

const Pagination = ({ offset, limit, totalItems, onPageChange }) => {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div>
      <button onClick={() => onPageChange("prev")} disabled={offset === 0}>
        ⬅️ Previous
      </button>
      <button
        onClick={() => onPageChange("next")}
        disabled={currentPage >= totalPages}
      >
        Next ➡️
      </button>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
