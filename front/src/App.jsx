import NavBar from "./components/NavBar"
import Form from "./components/Form"
import GraphDoble from './components/GraphDoble.jsx'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateSensor from "./pages/create-sensor.jsx"
import Graficos from "./pages/graficos.jsx"
import ListaSensores from "./pages/list-sensor.jsx"
import Tabla from "./pages/tabla-datos.jsx"
import Inicio from "./pages/inicio.jsx"
import { randomDataForDoubleChart } from './utils-graphs.js'


function App() {

  return (
    <div className ="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Inicio/>}/>
            <Route path="graficos" element={<Graficos/>}/>
            <Route path="list-sensor" element={<ListaSensores/>}/>
            <Route path="tabla-datos" element={<Tabla/>}/>
            <Route path="create-sensor" element={<CreateSensor/>}/>

            <Route path="*" element={ <Navigate to="/"/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
