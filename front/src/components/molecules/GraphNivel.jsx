import React from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dateFormatter,
  getMidnightTicks,
  tickFormatter,
} from "../utils/utils-graphs";
import CustomTooltip from "../utils/CustomTooltip";
import { useTheme } from "../../context/ThemeContext";

/*
    El prop "data" debe tener la forma:
    {
        date (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel_hidrometrico (m),
        temp (ºC)
    }
*/

export default function GraphNivel({ data, noBrush }) {
  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center h-full text-xs">
        No se recibieron datos de nivel hidrométrico.
      </div>
    );
  const { isDarkMode } = useTheme();

  const midnightTicks = getMidnightTicks(
    data[0].date,
    data[data.length - 1].date
  );

  // si las fechas no son un nro de ticks, se parsea
  if (!Number.isInteger(data[0] && data[0].date)) {
    data.forEach((punto, i) => {
      punto.date = new Date(punto.date).getTime();
    });
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickCount={10}
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={true}
          tickFormatter={tickFormatter}
        />
        <YAxis unit={"m"} />
        {midnightTicks.map((tick) => {
          const fecha = new Date(tick);
          const fechaStr = fecha.getDate() + "/" + fecha.getMonth();
          return (
            <ReferenceLine key={tick} x={tick} stroke="gray">
              <Label value={fechaStr} position="insideBottomLeft" />
            </ReferenceLine>
          );
        })}
        <Tooltip content={CustomTooltip} />
        <Area
          type="linear"
          dataKey="data"
          stroke="#8884d8"
          fill="#8884d8"
        />
        {!noBrush ? (
          <Brush
            height={25}
            fill={isDarkMode ? "#333" : "#e5e5e5"}
            stroke="#8884d8"
            travellerWidth={10}
            tickFormatter={(val) => dateFormatter(data[val].date)}
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
}
