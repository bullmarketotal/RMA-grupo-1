import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const api = import.meta.env.VITE_API_URL;

const SensorList = () => {
  const { id } = useParams();
  
  return (
    <div className="container mt-5">
      Id: {id}
    </div>
  );
};

export default SensorList;