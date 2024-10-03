import NavBar from "./components/NavBar";
import Form from "./components/Form";
import GraphDoble from "./components/GraphDoble.jsx";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { randomDataForDoubleChart } from "./utils-graphs.js";
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
