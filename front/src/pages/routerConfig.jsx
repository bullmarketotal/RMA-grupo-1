import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import { randomDataForDoubleChart } from "../utils-graphs";
import ApiFetch from "./ApiFetch";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import SensorView from "./SensorView";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  // data para probar
  const data = randomDataForDoubleChart();

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="tabla-datos" element={<ApiFetch />} />

        {/* Ruta protegida */}
        <Route
          path="create-sensor"
          element={
            <ProtectedRoute>
              <SensorForm />
            </ProtectedRoute>
          }
        />
        <Route path="sensor/:id" element={<SensorView />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
