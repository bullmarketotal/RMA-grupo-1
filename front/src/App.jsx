import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./pages/routerConfig.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
