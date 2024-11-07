import React from "react";

function CardData({ title, children }) {
  return (
    <div className="mb-4 bg-neutral-50 dark:bg-neutral-600 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg my-3">
      <div className="dark-bg normal-text rounded-t-lg p-2 border-b border-neutral-300 dark:border-neutral-600">
        <h6 className="text-center text-lg font-semibold">{title}</h6>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

export default CardData;
