import React, { useState } from "react";
import { FiltroDatos } from "../molecules";
import { GraphView, TableView } from ".";
import { Card, TextToggleButton } from "../atoms";

const NodoDataVisualizer = ({
  dataTemp,
  dataNivel,
  loading,
  onFilterChange,
  isExporting,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  function mergeAndSortByDate(arr1, arr2) {
    return [...arr1, ...arr2].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

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
        <FiltroDatos
          onFilterChange={onFilterChange}
          isExporting={isExporting}
        />
      </div>

      {!isToggled ? (
        <GraphView
          dataTemp={dataTemp}
          loading={loading}
          dataNivel={dataNivel}
        />
      ) : (
        <TableView
          data={{ items: mergeAndSortByDate(dataTemp, dataNivel) }}
          loading={loading}
        />
      )}
    </Card>
  );
};

export default NodoDataVisualizer;
