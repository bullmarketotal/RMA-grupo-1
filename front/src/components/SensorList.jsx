import useSWR from 'swr';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const SensorList = () => {
  const { data, error } = useSWR('http://localhost:8000/sensores', fetcher);

  if (error) return <div className="alert alert-danger">Error al cargar los sensores</div>;

  return (
    <div className="container mt-5"> 
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Lista de Sensores</h1>
          <ul className="list-group">
            {data.map((sensor) => (
              <li key={sensor.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{sensor.identificador}</span>
                <span className="badge bg-primary rounded-pill">{sensor.porcentajeBateria}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SensorList;
