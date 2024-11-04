import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import DatosPage from "./DatosPage";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import SensorView from "./SensorPage";
import Example from "./TestPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="datos-view" element={<DatosPage />} />
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
        <Route path="testpage" element={<Example />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
