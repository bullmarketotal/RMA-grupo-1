import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BateriaHeader from "../components/molecules/BateriaHeader";
import BateriaInfoPanel from "../components/molecules/BateriaInfoPanel";
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import { useNodos, useFetchNodoData } from "../hooks";
import { Container, Header } from "../components/atoms";
import { useNavigate } from "react-router-dom";

const BateriaPage = () => {
  
  const {id} = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  
  const nodo =useNodos({
    nodo_id: id,
    enableAdd: true,
    enableUpdate: true,
    enableDelete: true,
  });

  const sensorData = nodo.nodos;

  const { data, loading, error } = useFetchNodoData({
    offset: 1,
    nodo_id: id, 
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    order: "asc",
    orderBy: "date",
    type: 16,
  });
  


  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

    function volverAlSensor() {
      navigate(`/sensor/${id}`);
    }

  return (
    <Container>
      <div className="card-body d-flex justify-content-between">
        <Header title={"Bateria"} />
        <button
          id="btn-volver-atras"
          className="btn btn-action btn-active"
          onClick={volverAlSensor}
        >
          <i className="fa fa-undo m-2" aria-hidden="true"></i>
          Volver al Nodo
        </button>
      </div>
      <div id="main">
        <div className="card-body">
          <BateriaHeader sensor={sensorData} />
          <BateriaInfoPanel data={data.items} sensor={sensorData}  />
        </div>
      </div>
      <BateriaDataVisualizer
        data={data.items}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default BateriaPage;
