import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import { randomDataForDoubleChart } from "../utils-graphs";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import SensorView from "./SensorView";
import TablaDatos from "../components/TablaDatos";
import FiltrosFetch from "./FiltrosFetch";
import { useState } from "react";

const AppRoutes = () => {
  // data para probar
  const data = randomDataForDoubleChart();
  const [items,setItems] = useState([]); // esto vuela es solo pa mostrar algo xd

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="tabla-datos" element={  <div>
                                                <FiltrosFetch setData={setItems} />
                                                <TablaDatos items={items} />
                                            </div>} /> 

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
