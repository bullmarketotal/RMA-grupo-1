export default function CustomTooltip({ payload }) {
  const dato = payload[0];
  let unidad = "";
  if (dato?.name === "temperatura") unidad = "ºC";
  if (dato?.name === "nivel_hidrometrico") unidad = "m";

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "solid 1px black",
        "border-radius": "black",
        padding: "4px",
      }}
    >
      <svg height="12" width="12" style={{ marginRight: "8px" }}>
        <circle cx="6" cy="6" r="6" fill={payload[0]?.color || "black"} />
      </svg>
      {dato?.value.toFixed(1)} {unidad}
    </div>
  );
}
