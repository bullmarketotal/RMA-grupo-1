import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import { randomDataForDoubleChart } from "../utils-graphs";
import ApiFetch from "./ApiFetch";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import SensorView from "./SensorView";
import Inicio from "./inicio";

const AppRoutes = () => {
  //data para probar
  const now = new Date();
  const data = randomDataForDoubleChart();
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="tabla-datos" element={<ApiFetch />} />
        <Route path="create-sensor" element={<SensorForm />} />
        <Route path="sensor/:id" element={<SensorView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
