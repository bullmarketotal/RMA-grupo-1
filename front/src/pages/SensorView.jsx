import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SensorHeader from "../components/SensorHeader";
import SensorInfoPanel from "../components/SensorInfoPanel";
import SensorDataVisualizer from "../components/SensorDataVisualizer";
import LoadingSpinner from "../components/LoadingSpinner";

const api = import.meta.env.VITE_API_URL;
const CARD_HEIGHT = 200;
const itemsPerPage = 15;

const SensorView = () => {
  const { id } = useParams();
  const [nodo, setNodo] = useState({
    sensor: { id, identificador: null, latitud: null, longitud: null },
  });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("graph");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;

  useEffect(() => {
    fetch(`${api}/sensordata/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setNodo({
          sensor: {
            id,
            identificador: info.sensor.identificador,
            latitud: info.sensor.latitud,
            longitud: info.sensor.longitud,
          },
        });
        setData(info.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la información del nodo: " + err);
        setLoading(false);
      });
  }, [id]);
  const handleViewChange = (event) => setView(event.target.id);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const getVisibleData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="container mt-5">
      <div id="main" className="card mb-4 shadow">
        <div className="card-body">
          <SensorHeader sensor={nodo.sensor} loading={loading} />
          <SensorInfoPanel
            data={data}
            loading={loading}
            CARD_HEIGHT={CARD_HEIGHT}
          />
        </div>
      </div>
      <SensorDataVisualizer
        view={view}
        handleViewChange={handleViewChange}
        data={data}
        setData={setData}
        totalItems={totalItems}
        loading={loading}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        getVisibleData={getVisibleData}
        sensorId={id}
      />
    </div>
  );
};

export default SensorView;
