import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import SensorView from "./SensorView";
import "./AppRoutes.css";

const AppRoutes = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="list-sensor" element={<SensorList />} />
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
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
