import { dateFormatter } from "./utils-graphs";

export default function CustomTooltip({ payload }) {
  const dato = payload[0];
  let unidad = "";
  if (dato?.name === "temperatura") unidad = "ºC";
  if (dato?.name === "nivel_hidrometrico") unidad = "m";

  return (
    <div style={{
        backgroundColor: "white",
        width: "fit-content",
        border: "solid 1px black",
        borderRadius: "1rem",
        padding: "0.5rem 0.7rem",
    }}>
      <div className="text-sm text-slate-600">
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
