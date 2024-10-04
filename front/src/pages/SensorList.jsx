import useSWR from "swr";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard.jsx";

const SensorList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sensores")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log("res: " + res);
      })
      .catch((error) =>
        console.error("Error al hacer fetch a lista de sensores: " + error)
      );
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Sensores</h1>
          {data.map((sensor) => (
            <SensorCard sensor={sensor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorList;
