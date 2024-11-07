import React, { useState } from "react";
import { FiltroDatos } from "../molecules";
import { TableView } from ".";
import { Card, TextToggleButton } from "../atoms";
import GraphTension from "../molecules/GraphTension";


const BateriaDataVisualizer = ({ data, loading, onFilterChange }) => {
  const [view, setView] = useState("graph");
  const handleViewChange = (event) => {
    setView(event.target.id);
  };
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <Card>
      <div className="d-flex items-center space-x-2 mb-2 justify-content-start">
        <TextToggleButton
          textLeft={"Grafico"}
          textRight={"Tabla"}
          isToggled={isToggled}
          onToggled={handleToggle}
        />
        <FiltroDatos onFilterChange={onFilterChange} />
      </div>

      {view === "graph" ? (
        <GraphTension data={data.paquetes} loading={loading} />
      ) : (
        <TableView  />
      )}
    </Card>
  );
};

export default BateriaDataVisualizer;