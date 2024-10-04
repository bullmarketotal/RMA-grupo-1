import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import { tickFormatter, getMidnightTicks } from "../utils-graphs";

/*
    El prop "data" debe tener la forma:
    {
        fechaHora (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel (m),
        temp (ºC)
    }
*/

export default function GraphTemp({ data, syncId = 0 }) {
  const midnightTicks = getMidnightTicks(
    data[0].fechaHora,
    data[data.length - 1].fechaHora
  );

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
          domain={["dataMin", "dataMax"]}
          tick={false}
          tickFormatter={tickFormatter}
        />
        <YAxis
          unit={"ºC"}
          data={data}
          ticks={[-10, 0, 10, 20, 30, 40]}
          domain={["dataMin", "dataMax"]}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#ff5733"
          strokeWidth={3}
          dot={false}
        />
        {midnightTicks.map((tick) => {
          const fecha = new Date(tick);
          const fechaStr = fecha.getDate() + "/" + fecha.getMonth();
          return (
            <ReferenceLine key={tick} x={tick} stroke="gray">
              <Label value={fechaStr} position="insideBottomLeft" />
            </ReferenceLine>
          );
        })}
        <ReferenceLine
          key={0}
          y={0}
          stroke="gray"
          strokeDasharray={8}
        ></ReferenceLine>
        <Tooltip
          labelFormatter={() => ""}
          formatter={(value) => value + "°C"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
