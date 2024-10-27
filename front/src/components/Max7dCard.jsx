export default function Max7dCard({ data, CARD_WIDTH }) {
  const maxNivel7dias = (() => {
    const dateOf7daysBefore = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

    // caso sin datos en las ult. 24 horas
    if (data[data.length - 1] < dateOf7daysBefore)
      return {
        nivel_hidrometrico: "--",
        stringTime: `Sin datos`,
      };

    let max = data[data.length - 1];

    for (let i = data.length - 2; i >= 0; i--) {
      if (new Date(data[i].date) < dateOf7daysBefore) break;
      if (data[i].nivel_hidrometrico > max.nivel_hidrometrico) max = data[i];
    }
    const dateOfMax = new Date(max.date);
    return {
      nivel_hidrometrico: max.nivel_hidrometrico.toFixed(1),
      stringTime: `${String(dateOfMax.getDate()).padStart(2, "0")}/${String(
        dateOfMax.getMonth()
      ).padStart(2, "0")} - ${dateOfMax.getHours()}:${String(
        dateOfMax.getMinutes()
      ).padStart(2, "0")}hs`,
    };
  })();

  return (
    <div className="card me-2" style={{ width: CARD_WIDTH }}>
      <div className="card-header">
        <h6 className="card-title text-center mb-0">Pico 7 días</h6>
      </div>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <p className="card-text fs-5">
          <div>
            <i className="fa fa-tint me-2" aria-hidden="true" />
            {maxNivel7dias.nivel_hidrometrico}m
          </div>
        </p>
        <h6 className="card-subtitle mb-2 text-body-secondary" style={{"white-space": "nowrap", overflow: "hidden"}}>
          {maxNivel7dias.stringTime}
        </h6>
      </div>
    </div>
  );
}
