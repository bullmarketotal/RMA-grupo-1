import useSWR from "swr";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const SensorList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/sensores")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
        console.log(res);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Sensores</h1>
          <ul className="list-group">
            {data.map((sensor) => (
              <li
                key={sensor.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{sensor.identificador}</span>
                <span className="badge bg-primary rounded-pill">
                  {sensor.porcentajeBateria}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SensorList;
