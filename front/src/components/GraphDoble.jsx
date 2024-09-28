import React from 'react';
import GraphTemp from './GraphTemp';
import GraphNivel from './GraphNivel';


export default function GraphDoble({data}) {
  return (
    <div style={{ width: '100%' }}>
      <h4>Nivel hidrométrico</h4>
      <GraphNivel data={data} syncId={0} />
      <p>Temperatura</p>
      <GraphTemp data={data} syncId={0}/>
    </div>
  );
};


