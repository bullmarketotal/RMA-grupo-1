import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const api = import.meta.env.VITE_API_URL;

const CARD_HEIGHT = 150;

const SensorView = () => {
    const { id } = useParams();
    const [sensor, setSensor] = useState({ id, identificador: "RMA-1", latitud: -43.2466030899736, longitud: -65.4921152059314 })

    return (
        <div className="container mt-5">
            <div id="main">
                <div id="header" className="d-flex justify-content-between pb-4">
                    <div id="info-sensor">
                        <h2><i className="fa fa-rss" aria-hidden="true" /> {sensor.identificador}</h2>
                        <span><i className="fa fa-map-marker me-2" aria-hidden="true" /> {sensor.latitud}, {sensor.longitud}</span>
                    </div>
                    <button id="btn-modificar" className="btn btn-secondary align-self-start">Modificar Nodo</button>
                </div>
                <div id="content" className="d-flex justify-content-between align-items-start">
                   
                    <div id="card-container" className="d-flex" style={{height: CARD_HEIGHT}}>
                        <div className="card me-5 p-3">
                            <div className="card-body">
                                <p className="card-text fs-3 d-flex">
                                    <div className="me-4">
                                        <i className="fa fa-thermometer me-2" aria-hidden="true" />12.4ºC
                                    </div>
                                    <div>
                                        <i className="fa fa-tint me-2" aria-hidden="true" />1.3mts
                                    </div>
                                </p>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Hace 12 minutos</h6>
                            </div>
                        </div>
                        <div className="card align-self-start ms-5" style={{height: CARD_HEIGHT}}>
                            <div className="card-body">
                                <h5 className="card-title">Máximo 24hs</h5>
                                <p className="card-text fs-5">
                                    <div>
                                        <i className="fa fa-tint me-2" aria-hidden="true" />3.3mts
                                    </div>
                                </p>
                                <h6 className="card-subtitle mb-2 text-body-secondary">13:02</h6>
                            </div>
                        </div>
                        <div className="card align-self-start"  style={{height: CARD_HEIGHT}}>
                            <div className="card-body">
                                <h5 className="card-title">Máximo 7 días</h5>
                                <p className="card-text fs-5">
                                    <div>
                                        <i className="fa fa-tint me-2" aria-hidden="true" />4.2mts
                                    </div>
                                </p>
                                <h6 className="card-subtitle mb-2 text-body-secondary">04/10/2024 09:39</h6>
                            </div>
                        </div>
                        <div className="card align-self-start"  style={{height: CARD_HEIGHT}}>
                            <div className="card-body">
                                <h5 className="card-title">Máximo mensual</h5>
                                <p className="card-text fs-5">
                                    <div>
                                        <i className="fa fa-tint me-2" aria-hidden="true" />5.0mts
                                    </div>
                                </p>
                                <h6 className="card-subtitle mb-2 text-body-secondary">04/10/2024 09:39</h6>
                            </div>
                        </div>
                    </div>
                    <div id="mapa" className="d-none d-lg-block" style={{ height: '270px', width: '350px', "background-color": 'lightblue' }}></div>
                </div>
                <hr/>
            </div>
        </div>
    );
};

export default SensorView;