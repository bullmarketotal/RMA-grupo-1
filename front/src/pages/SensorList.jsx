import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import SensorCard from "../components/SensorCard.jsx";
const api = import.meta.env.VITE_API_URL;

const SensorList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${api}/sensores`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) =>
        console.error("Error al hacer fetch a lista de sensores: " + error)
      );
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Sensores</h1>
          {data.map((sensor) => (
            <SensorCard sensor={sensor} key={sensor.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorList;
