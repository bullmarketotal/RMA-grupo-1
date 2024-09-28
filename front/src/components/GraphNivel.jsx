import React from 'react';
import { AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dateFormatter } from '../utils';

export default function GraphNivel({data, syncId}) {
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
          <XAxis dataKey="hora" type="number" domain={['dataMin', 'dataMax']} tickFormatter={dateFormatter} interval={0}/>
          <YAxis />
          <Tooltip labelFormatter={dateFormatter} formatter={value => value + 'm'}/>
          <Area type="linear" dataKey="nivel" stroke="#8884d8" fill="#8884d8" />
          <Brush/>
        </AreaChart>
      </ResponsiveContainer>
    )
}