import { dateFormatter } from "../utils-graphs";
import Max24hsCard from "./Max24hsCard";
import Max7dCard from "./Max7dCard";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { obtenerStringTiempoDesdeUltimoDato } from "../utils-graphs";

export default function NodoRecentDataContainer({data, CARD_HEIGHT}) {

    const CARD_WIDTH = "25%";
    const MAIN_CARD_WIDTH = "350px";

    return (
        <div
            id="card-container"
            className="d-flex align-items-center"
            style={{ height: CARD_HEIGHT }}
            title={dateFormatter(new Date(data[data.length-1].date).getTime())}
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
                  { obtenerStringTiempoDesdeUltimoDato(data) }
                </h6>
              </div>
            </div>
            <Max24hsCard data={data} CARD_WIDTH={CARD_WIDTH}/>
            <Max7dCard data={data} CARD_WIDTH={CARD_WIDTH}/>
          </div>
    )
}