import React, { useState } from "react";
import { FiltroDatos } from "../molecules";
import { GraphView, TableView } from ".";
import { Card, TextToggleButton } from "../atoms";

const NodoDataVisualizer = ({ data, loading, onFilterChange, isExporting }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  console.log("showFiltro en NodoDataVisualizer:", !isExporting); 

  return (
    <Card>
      <div className="d-flex items-center space-x-2 mb-2 justify-content-start">
        {!isExporting && (
          <TextToggleButton
            textLeft={"Gráfico"}
            textRight={"Tabla"}
            isToggled={isToggled}
            onToggled={handleToggle}
          />
        )}
        <FiltroDatos onFilterChange={onFilterChange} isExporting={isExporting} />
      </div>

      {!isToggled ? (
        <GraphView data={data.paquetes} loading={loading} />
      ) : (
        <TableView data={data} loading={loading} />
      )}
    </Card>
  );
};

export default NodoDataVisualizer;
