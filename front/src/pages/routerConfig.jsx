import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SensorForm from './SensorForm';
import SensorList from './SensorList';
import Inicio from './inicio';
import NavBar from '../components/NavBar';
import TablaDatos from './tabla-datos';
import GraphDoble from '../components/GraphDoble';
import { Navigate } from 'react-router-dom';


const AppRoutes = () => {
    //data para probar
    const now = new Date();
    const data =[ 
        {
        fechaHora: now.getTime(),  // Obtener los ticks (milisegundos desde 1970)
        nivel: 5.5,                // Ejemplo de nivel en metros (puedes cambiarlo)
        temp: 22.3                 // Ejemplo de temperatura en grados Celsius (puedes cambiarlo)
    },
    {
        fechaHora: now.getTime(),  
        nivel: 8.5,                
        temp: 19.3                 
    },
    {
        fechaHora: now.getTime(),  
        nivel: 3.5,                
        temp: 4.3                
    }
    //////////////////////////////7

    ];
  return (
    <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Inicio/>}/>
            <Route path="graficos" element={<GraphDoble data={data}/>}/>
            <Route path="list-sensor" element={<SensorList/>}/>
            <Route path="tabla-datos" element={<TablaDatos/>}/>
            <Route path="create-sensor" element={<SensorForm/>}/>

            <Route path="*" element={ <Navigate to="/"/>} />
          </Route>
    </Routes>
  );
};

export default AppRoutes;