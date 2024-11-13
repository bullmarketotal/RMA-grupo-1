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
import { dateFormatter, getMidnightTicks } from "../utils/utils-graphs";
import CustomTooltip from "../utils/CustomTooltip";

// Datos de ejemplo
const batteryData = [
  { date: "2024-09-20", voltage: 3.7 },
  { date: "2024-09-25", voltage: 3.6 },
  { date: "2024-10-01", voltage: 3.5 },
  { date: "2024-10-10", voltage: 3.4 },
  { date: "2024-10-15", voltage: 3.5 },
  { date: "2024-10-15", voltage: 3.4 },
  { date: "2024-10-15", voltage: 3.5 },
  { date: "2024-10-15", voltage: 3.5 },
  { date: "2024-10-15", voltage: 3.5 },
  { date: "2024-10-15", voltage: 3.5 },
  { date: "2024-10-23", voltage: 3.5 },
  { date: "2024-10-23", voltage: 3.3 },
  { date: "2024-10-25", voltage: 3.3 },
  { date: "2024-10-25", voltage: 3.3 },
  { date: "2024-10-26", voltage: 3.2 },
  { date: "2024-10-26", voltage: 3.2 },
  { date: "2024-10-27", voltage: 3.4 },
  { date: "2024-10-27", voltage: 3.4 },
  { date: "2024-10-28", voltage: 3.4 },
  { date: "2024-10-29", voltage: 2.5 },
  { date: "2024-10-30", voltage: 2.3 },
  { date: "2024-10-1", voltage: 3.4 },
  { date: "2024-10-1", voltage: 3.4 },
  { date: "2024-10-1", voltage: 2.5 },
  { date: "2024-10-1", voltage: 2.3 },
  { date: "2024-10-2", voltage: 1.2 },
  { date: "2024-10-3", voltage: 2.51 },
];

const GraphTension = () => {
  return (
    <div className="battery-monitor m-2">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={batteryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis
            dataKey="date"
            tickFormatter={dateFormatter}
            ticks={getMidnightTicks(batteryData)}
          >
            <Label value="Fecha" offset={40} position="bottom" />
          </XAxis>

          <YAxis>
            <Label value="Tensión (V)" angle={-90} position="insideLeft" />
          </YAxis>

          <Tooltip content={<CustomTooltip />} animationDuration={0} />
          
          <ReferenceLine y={3.5} label="Nivel normal de batería" stroke="red" strokeDasharray="3 3" />
          
          <Area
            type="monotone"
            dataKey="voltage"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorVoltage)"
            isAnimationActive={false} // Desactivar animación en el gráfico
          />

          <Brush dataKey="date" height={30} stroke="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphTension;
