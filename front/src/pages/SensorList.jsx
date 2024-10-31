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
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Nodos</h1>
          {data.map((sensor) => (
              <div className="mb-3" key={sensor.id}>
                 <SensorCard sensor={sensor} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorList;
