import React from 'react';
import { AreaChart, Area, Brush, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

let date = new Date();

/**
 * Convierte numero de ticks (epochs de Unix) a un string de fecha
 * @param {number} ticks 
 * @returns DD/MM/YYYY hh:mm
 */
function dateFormatter(ticks) {
  const date = new Date(ticks);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


function generarHora() {
  date.setHours(date.getHours() + 1)
  return date.getTime();
}

const data = [
  {
    hora: generarHora(),
    nivel: 2.3,
    temp: 18.8
  },
  {
    hora: generarHora(),
    nivel: 4.2,
    temp: 12.2
  },
  {
    hora: generarHora(),
    nivel: 4.8,
    temp: 8.3
  },
  {
    hora: generarHora(),
    nivel: 7.9,
    temp: 19.4
  },
  {
    hora: generarHora(),
    nivel: 3.2,
    temp: 22.4
  },
  {
    hora: generarHora(),
    nivel: 1.9,
    temp: 25.2
  },
  {
    hora: generarHora(),
    nivel: 0.8,
    temp: 27.1
  }
];

console.log(data)

export default function GraphDoble() {
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


