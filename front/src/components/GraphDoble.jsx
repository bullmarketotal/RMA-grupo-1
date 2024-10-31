import React from "react";
import GraphNivel from "./GraphNivel";
import GraphTemp from "./GraphTemp";

/*
    El prop "data" debe tener la forma:
    {
        date (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel_hidrométrico (m),
        temperatura (ºC)
    }
*/

export default function GraphDoble({ data }) {

  if(data.length === 0)
    return (
      <div>No se pudieron procesar los datos para el gráfico.</div>
  )
  
  // si las fechas no son un nro de ticks, se parsea
  if(! Number.isInteger(data[0] && data[0].date)) {
    data.forEach((punto, i) => {
      punto.date = (new Date(punto.date)).getTime()
    })
  }

  return (
    <div style={{ width: "100%" }}>
      <h4>Nivel hidrométrico</h4>
      <GraphNivel data={data} syncId={0} />
      <h4>Temperatura</h4>
      <GraphTemp data={data} syncId={0} />
    </div>
  );
}
