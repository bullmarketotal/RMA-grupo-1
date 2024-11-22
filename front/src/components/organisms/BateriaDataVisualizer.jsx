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
      
        <FiltroDatos onFilterChange={onFilterChange} />
      

      
        <GraphTension data={data} loading={loading} />
      
    </Card>
  );
};

export default BateriaDataVisualizer;