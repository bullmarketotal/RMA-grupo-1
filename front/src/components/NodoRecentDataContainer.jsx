export default function NodoRecentDataContainer({data, CARD_HEIGHT}) {

    const CARD_WIDTH = "25%";
    const MAIN_CARD_WIDTH = "350px";

    const obtenerStringTiempoDesdeUltimoDato = () => {
        const lastTime = new Date(data[data.length - 1].date)
        const now = new Date();
        
        const minutesBetween = (now - lastTime) / (1000 * 60);
        console.log(minutesBetween)
        // Retorno segun hace cuanto haya sido
        if(minutesBetween < 1)
            return `Hace menos de un minuto`
        if(minutesBetween < 2)
            return `Hace un minuto`
        if(minutesBetween < 59)
            return `Hace ${minutesBetween.toFixed(0)} minutos`
        if(minutesBetween < 120)
            return `Hace 1 hora`
        if(minutesBetween < 60 * 24)
            return `Hace ${Math.floor(minutesBetween / 60).toFixed(0)} horas`
        
        return `Hace ${Math.floor(minutesBetween / (60 * 24)).toFixed(0)} días`
    }

    return (
        <div
            id="card-container"
            className="d-flex align-items-center"
            style={{ height: CARD_HEIGHT }}
          >
            <div className="card me-5 p-3" style={{width: MAIN_CARD_WIDTH}}>
              <div className="card-body align-items-center">
                <p className="card-text fs-3 d-flex">
                  <span className="me-4">
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    {
                      data[data.length-1].nivel_hidrometrico.toFixed(2) + "m"
                    }
                  </span>
                  <span>
                    <i className="fa fa-thermometer me-2" aria-hidden="true" />
                    {
                      data[data.length-1].temperatura.toFixed(1) + "ºC"
                    }
                  </span>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  { obtenerStringTiempoDesdeUltimoDato() }
                </h6>
              </div>
            </div>
            <div className="card me-2 p-1" style={{width: CARD_WIDTH}}>
              <div className="card-header">
                <h6 className="card-title text-center">Máximo 24hs</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    3.3m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  13:02
                </h6>
              </div>
            </div>
            <div className="card me-2 p-1"  style={{width: CARD_WIDTH}}>
              <div className="card-header">
                <h6 className="card-title text-center">Máximo 7 días</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    4.2m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  04/10/2024 09:39
                </h6>
              </div>
            </div>
            <div className="card p-1"  style={{width: CARD_WIDTH}}>
              <div className="card-header  text-center">
                <h6>Máximo mensual</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    5.0m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  04/10/2024 09:39
                </h6>
              </div>
            </div>
          </div>
    )
}