import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Header,
  LoadingSpinner,
  MiniMap,
} from "../components/atoms";
import {
  MaxLevelCard,
  NodoHeader,
  NodoRecentDataCard,
} from "../components/molecules";
import { NodoDataVisualizer } from "../components/organisms";
import { useFetchSensorData } from "../hooks";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const sensorData = useMemo(() => data?.sensor, [data?.sensor]);
  const paquetesData = useMemo(() => data?.paquetes, [data?.paquetes]);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  const { latitud, longitud } = sensorData;

  return (
    <Container>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80 pb-4">
          <div className="col-span-2">
            <NodoHeader sensor={sensorData} />
          </div>
          <div className="row-span-2 shadow-sm rounded-lg overflow-hidden w-full h-full min-h-64">
            <MiniMap lat={latitud} lng={longitud} />
          </div>
          <div className="col-span-2 flex gap-4 items-center">
            <div className="w-1/2">
              <NodoRecentDataCard data={paquetesData} />
            </div>
            <div className="w-1/2 flex gap-4">
              <div className="w-1/2">
                <MaxLevelCard data={paquetesData} timeFrame={TIMEFRAME_7D} />
              </div>
              <div className="w-1/2">
                <MaxLevelCard data={paquetesData} timeFrame={TIMEFRAME_24H} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <NodoDataVisualizer
        data={data}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default NodoPage;
