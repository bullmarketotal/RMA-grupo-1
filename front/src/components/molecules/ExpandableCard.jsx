import React, { useState } from "react";
import FormularioNodo from "./FormularioNodo";

const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 rounded-2xl p-3 cursor-pointer"
      onClick={!isExpanded ? handleExpandClick : null}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-400 text-3xl">+</span>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Crear Nuevo Nodo</h3>
          </div>
          <FormularioNodo onClose={handleCollapseClick} />
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
