import { dateFormatter } from "./utils-graphs";

export default function CustomTooltip({ payload }) {
  const dato = payload[0];
  let unidad = "";
  if (dato?.name === "temperatura") unidad = "ºC";
  if (dato?.name === "nivel_hidrometrico") unidad = "m";

  return (
    <div className="bg-slate-100 dark:bg-slate-800 dark:text-white drop-shadow shadow-md px-3 py-2 rounded-md">
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {dateFormatter(dato?.payload.date)}
      </div>
      <div className="flex text-center">
        <svg height="12" width="12" style={{ margin: "0.35rem" }}>
          <circle cx="6" cy="6" r="6" fill={payload[0]?.color || "black"} />
        </svg>
        {dato?.value.toFixed(1)} {unidad}
      </div>
    </div>
  );
}
