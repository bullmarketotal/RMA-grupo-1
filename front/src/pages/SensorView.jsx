import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SensorHeader from "../components/SensorHeader";
import SensorInfoPanel from "../components/SensorInfoPanel";
import SensorDataVisualizer from "../components/SensorDataVisualizer";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetchSensorData from "../hooks/useFetchSensorData";

const SensorView = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div id="main" className="card mb-4 shadow">
        <div className="card-body">
          <SensorHeader sensor={data.sensor} loading={loading} />
          <SensorInfoPanel data={data} loading={loading} />
        </div>
      </div>
      <SensorDataVisualizer
        data={data}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default SensorView;
