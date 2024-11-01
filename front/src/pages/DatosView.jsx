import FiltrosFetch from "../components/FiltrosFetch";
import TableView from "../components/TableView";
import { useState } from "react";
import useFetchSensorData from "../hooks/useFetchSensorData";
import useFetchSensores from "../hooks/useFetchSensores";
import LoadingSpinner from "../components/LoadingSpinner";

const DatosPage = () => {
  const [id, setId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);
  const {
    data: sensores,
    loading: loadingSensores,
    error: errorSensores,
  } = useFetchSensores();

  if (error) return <p>{error}</p>;
  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-3">Datos</h1>
          {loadingSensores ? (
            <LoadingSpinner />
          ) : errorSensores ? (
            <p>{errorSensores}</p>
          ) : (
            <div className="mb-3">
              <label className="form-label me-2 mb-0">
                <strong>Seleccionar ID de Sensor</strong>
              </label>
              <select
                id="sensorId"
                className="form-select"
                value={id}
                onChange={(e) => setId(e.target.value)}
              >
                {sensores.map((sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {`${sensor.id} - ${sensor.identificador}`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <FiltrosFetch onFilterChange={handleFilterChange} className="mb-3" />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TableView data={data} loading={loading} />
          )}
          {/* <TableView data={data} loading={loading} /> */}
        </div>
      </div>
    </div>
  );
};

export default DatosPage;
