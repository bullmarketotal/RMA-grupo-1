import FiltrosFetch from "../components/FiltrosFetch";
import TablaDatos from "../components/TablaDatos";
import { useState } from "react";

const DatosPage = () => {
    
const [data, setData] = useState([]);

return (
  <div className="container mt-5">
    <div className="card">
      <div className="card-body">
        <h1 className="card-title mb-3">Datos</h1>
        <FiltrosFetch setData={setData} className="mb-3" /> 
        <TablaDatos items={data} />
      </div>
    </div>
  </div>
);
  };

  export default DatosPage;