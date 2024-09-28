import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dateFormatter } from '../utils';

/*
    El prop "data" debe tener la forma:
    {
        fecha (en ticks, obteniendose mediante el metodo getTime() de los objetos Date) (este campo incluye también la hora),
        nivel (m),
        temp (ºC)
    }
*/ 

export default function GraphTemp({data, syncId}) {
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
          <XAxis dataKey="hora" type="number" domain={['dataMin', 'dataMax']} tickFormatter={dateFormatter} tickCount={5} interval={0}/>
          <YAxis />
          <Tooltip labelFormatter={() => ''} formatter={value => value + '°C'}/>
          <Line type="monotone" dataKey="temp" stroke="#ff5733" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    )
}