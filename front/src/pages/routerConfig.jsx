import React from "react";
import { Routes, Route } from "react-router-dom";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import Inicio from "./inicio";
import NavBar from "../components/NavBar";
import TablaDatos from "./tabla-datos";
import GraphDoble from "../components/GraphDoble";
import { Navigate } from "react-router-dom";
import { randomDataForDoubleChart } from "../utils-graphs";

const AppRoutes = () => {
  //data para probar
  const now = new Date();
  const data = randomDataForDoubleChart();
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="graficos" element={<GraphDoble data={data} />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="tabla-datos" element={<TablaDatos />} />
        <Route path="create-sensor" element={<SensorForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
