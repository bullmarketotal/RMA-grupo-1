import React from 'react';
import { AreaChart, Area, Brush, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Convierte numero de ticks a un string de fecha (ticks: epochs de Unix; el número devuelto por el metodo getTime() de los objetos Date) 
 * @param {number} ticks 
 * @returns {string} DD/MM/YYYY hh:mm
 */
function dateFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export default function GraphDoble({data}) {
  return (
    <div style={{ width: '100%' }}>
      <h4>Nivel hidrométrico</h4>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" type="number" domain={['dataMin', 'dataMax']} tickFormatter={dateFormatter} interval={0}/>
          <YAxis />
          <Tooltip labelFormatter={dateFormatter} formatter={value => value + 'm'}/>
          <Area type="linear" dataKey="nivel" stroke="#8884d8" fill="#8884d8" />
          <Brush/>
        </AreaChart>
      </ResponsiveContainer>
      <p>Temperatura</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" type="number" domain={['dataMin', 'dataMax']} tickFormatter={dateFormatter} tickCount={5} interval={0}/>
          <YAxis />
          <Tooltip labelFormatter={() => ''} formatter={value => value + '°C'}/>
          <Line type="monotone" dataKey="temp" stroke="#ff5733" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


