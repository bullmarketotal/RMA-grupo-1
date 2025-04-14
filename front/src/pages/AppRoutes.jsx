import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import DatosPage from "./DatosPage";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import NodoPage from "./NodoPage";
import CuencaPage from "./CuencaPage";
import ProtectedRoute from "./ProtectedRoute";
import SensorForm from "./SensorForm";
import CuencaForm from "./CuencaForm";
import NodoList from "./NodoList";
import CuencaList from "./CuencaList";
import Example from "./TestPage";
import BateriaPage from "./BateriaPage";
import LogoutConfirmationPage from "./LogoutConfirmationPage";
import RegisterPage from "./RegisterPage";
import ConfigPage from "./ConfigPage";
import ConfiguracionMenuPage from "./ConfiguracionMenuPage";
import { ConfigNotifications } from "./ConfigNotifications";
import AdminPage from "./AdminPage";
import Error403 from "./Error403";
import PageDatosArchivos from "./PageDatosArchivo";
import GestionNodosPage from "./GestionNodosPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          }
        />
        <Route path="403" element={<Error403 />} />
        <Route
          path="lista-nodos"
          element={
            <ProtectedRoute>
              <NodoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="lista-cuencas"
          element={
            <ProtectedRoute>
              <CuencaList />
            </ProtectedRoute>
          }
        />
        <Route
          path="datos-view"
          element={
            <ProtectedRoute>
              <DatosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="datos-view/archivos"
          element={
            <ProtectedRoute>
              <PageDatosArchivos />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-sensor"
          element={
            <ProtectedRoute>
              <SensorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-cuenca"
          element={
            <ProtectedRoute>
              <CuencaForm />
            </ProtectedRoute>
          }
        />
        <Route path="cuenca/:cuencaId/sensor/:id" element={<NodoPage />} />
        <Route path="cuenca/:id" element={<CuencaPage />} />
        <Route path="cuenca/:cuencaId/sensor/:id/bateria-page" element={<BateriaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="testpage" element={<Example />} />
        <Route path="/confirm-logout" element={<LogoutConfirmationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gestion-nodos" element={<GestionNodosPage />} />
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute>
              <ConfigNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion/general"
          element={
            <ProtectedRoute>
              <ConfigPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <ConfiguracionMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administrador"
          element={
            <ProtectedRoute permission={"admin"}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
