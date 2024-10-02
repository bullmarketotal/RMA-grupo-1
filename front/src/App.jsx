import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate
import React, { useState } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/SideBar';
import SensorForm from './components/SensorForm';
import SensorList from './components/SensorList'; 

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Router>
            <div className="d-flex" style={{ margin: 0, padding: 0 }}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

                <div 
                    className="content"
                    style={{ 
                        width: isOpen ? 'calc(100% - 250px)' : '100%', 
                        marginRight: isOpen ? '250px' : '0', 
                        transition: 'margin-right 0.8s, width 0.8s',
                    }}
                >
                    <NavBar toggleSidebar={toggleSidebar} />
                    
                    <div className="p-4">
                        <Routes>
                            <Route path="/crear-sensor" element={<SensorForm />} />
                            <Route path="/sensores" element={<SensorList />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
