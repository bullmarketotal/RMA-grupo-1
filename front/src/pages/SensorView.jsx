import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const api = import.meta.env.VITE_API_URL;

const SensorView = () => {
    const { id } = useParams();
    const [sensor, setSensor] = useState({ id, identificador: "RMA-1", latitud: -43.2466030899736, longitud: -65.4921152059314 })

    return (
        <div className="container mt-5">
            <div id="main">
                <div id="header" className="d-flex justify-content-between">
                    <div id="info-sensor">
                        <h2><i className="fa fa-rss" aria-hidden="true" /> {sensor.identificador}</h2>
                        <span><i className="fa fa-map-marker me-2" aria-hidden="true" /> {sensor.latitud}, {sensor.longitud}</span>
                    </div>
                    <button id="btn-modificar" className="btn btn-secondary">Modificar Nodo</button>
                </div>
                <div id="content" className="d-flex justify-content-between align-items-center">
                    <div id="mapa" style={{ height: '200px', width: '290px', "background-color": 'lightblue' }}></div>
                    <div id="card-container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Último dato</h5>
                                    <p className="card-text fs-5">
                                        <div>
                                            <i className="fa fa-thermometer me-2" aria-hidden="true"/>12.4ºC
                                        </div>
                                        <div>
                                            <i className="fa fa-tint me-2" aria-hidden="true"/>1.3mts
                                        </div>
                                    </p>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Hace 12 minutos</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorView;