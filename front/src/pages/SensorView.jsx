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
                <div id="content" className="d-flex justify-content-between">
                    <div id="mapa" style={{ height: '200px', width: '290px', "background-color": 'lightblue' }}></div>
                    <div id="card-container">
                        <div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorView;