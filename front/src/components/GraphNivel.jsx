import React from 'react';
import { AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { tickFormatter, dateFormatter, getMidnightTicks } from '../utils-graphs';

/*
    El prop "data" debe tener la forma:
    {
        fechaHora (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel (m),
        temp (ºC)
    }
*/


export default function GraphNivel({data, syncId}) {
  
  const midnightTicks = getMidnightTicks(data[0].fechaHora, data[data.length - 1].fechaHora);

  return (
        <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId={syncId}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="fechaHora"
            tickCount={7}
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={tickFormatter}
            />
          <YAxis />
          {midnightTicks.map(tick => {
            const fecha = new Date(tick);
            const fechaStr = fecha.getDate() + "/" + fecha.getMonth()
            return (
              <ReferenceLine key={tick} x={tick} stroke="gray">
              <Label value={fechaStr} position="bottom"/>
            </ReferenceLine>
        )})}
          <Tooltip labelFormatter={dateFormatter} formatter={value => value + 'm'}/>
          <Area type="linear" dataKey="nivel" stroke="#8884d8" fill="#8884d8" />
          <Brush/>
        </AreaChart>
      </ResponsiveContainer>
    )
} 