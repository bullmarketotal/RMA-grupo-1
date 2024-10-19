import React from "react";
import GraphNivel from "./GraphNivel";
import GraphTemp from "./GraphTemp";

/*
    El prop "data" debe tener la forma:
    {
        fechaHora (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel (m),
        temp (ºC)
    }
*/

export default function GraphDoble({ data }) {
  return (
    <div style={{ width: "100%" }}>
      <h4>Nivel hidrométrico</h4>
      <GraphNivel data={data} syncId={0} />
      <h4>Temperatura</h4>
      <GraphTemp data={data} syncId={0} />
    </div>
  );
}
