import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./pages/routerConfig.jsx";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
