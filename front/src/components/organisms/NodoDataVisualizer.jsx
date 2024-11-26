import React, { useState } from "react";
import { FiltroDatos } from "../molecules";
import { GraphView, TableView } from ".";
import { Card, TextToggleButton } from "../atoms";

const NodoDataVisualizer = ({ dataTemp,dataNivel, loading, onFilterChange, isExporting }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };


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
        <GraphView dataTemp={dataTemp} loading={loading} dataNivel={dataNivel}/>
      ) : (
        <TableView data={{items: dataTemp.concat(dataNivel)}} loading={loading} />
      )}
    </Card>
  );
};

export default NodoDataVisualizer;
