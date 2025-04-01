import React, { useMemo, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, LoadingSpinner, MiniMap } from "../components/atoms";
import {
  MaxLevelCard,
  NodoHeader,
  NodoRecentDataCard,
} from "../components/molecules";
import CuencaHeader from "../components/molecules/CuencaHeader";
import { NodoDataVisualizer } from "../components/organisms";
import { useFetchNodoData, useNodos } from "../hooks";
import PDFNodo from "../components/molecules/PDFNodo";
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer";
import NodoList from "../pages/NodoList";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const CuencaPage = () => {
  const { id } = useParams();
    const [sensorData, setCuencas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCuencas = async () => {
        try {
          const response = await fetch(`http://localhost:8000/cuencas/${id}`);
          if (!response.ok) {
            throw new Error("Error al obtener las cuencas");
          }
          const cuencasData = await response.json();
          setCuencas(cuencasData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
        
      };
  
      fetchCuencas();
      console.log("CUENCANODOS",sensorData);
    }, []);
  
    if (error) {
      return (
        <ErrorSimple
          title={"No se pudieron obtener las cuencas"}
          description={error}
        />
      );
    }

  return (
    <div>
    <Container>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <div className="col-span-2 flex flex-col">
            <CuencaHeader sensor={sensorData}  />
          </div>
          <div className="row-span-2 shadow-sm rounded-lg overflow-hidden w-full max-h-80 min-h-64 flex justify-end">
            {sensorData.latitud !== undefined &&
            sensorData.longitud !== undefined ? (
              <MiniMap lat={sensorData.latitud} lng={sensorData.longitud} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        
      </Card>


    </Container>
    <NodoList cuenca_id={id}/>
    </div>
  );
};

export default CuencaPage;
