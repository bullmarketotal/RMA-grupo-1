import "bootstrap/dist/css/bootstrap.min.css";
import SensorCard from "../components/SensorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetchSensores from "../hooks/useFetchSensores";

const SensorList = () => {
  const { data, loading, error } = useFetchSensores();
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Sensores</h1>
          {loading ? (
            <LoadingSpinner />
          ) : (
            data.map((sensor) => (
              <div className="mb-3" key={sensor.id}>
                <SensorCard sensor={sensor} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorList;
