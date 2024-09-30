import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { tickFormatter, getHourlyTicks } from '../utils-graphs';

/*
    El prop "data" debe tener la forma:
    {
        fechaHora (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel (m),
        temp (ºC)
    }
*/ 

export default function GraphTemp({data, syncId=0}) {
    return (
        <ResponsiveContainer width="100%" height={200}>
        <LineChart
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
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={tickFormatter}
            />
          <YAxis />
          <Tooltip labelFormatter={() => ''} formatter={value => value + '°C'}/>
          <Line type="monotone" dataKey="temp" stroke="#ff5733" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    )
}