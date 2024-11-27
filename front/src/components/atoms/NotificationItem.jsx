import { obtenerTimeAgoString } from "../utils/date";
import LinkComponent from "./LinkComponent";

const getDotColor = (alert_id) => {
  if (alert_id === 1) return "yellow";
  if (alert_id === 2) return "orange";
  if (alert_id === 3) return "red";
  return "blue";
};

function NotificationItem({ data }) {
  const time = new Date(data.fecha_hora);

  const breadcrumbPath = [
    { label: "Home", path: "/" },
    { label: `Nodo Nº${data.nodo_id}`, path: `/nodo/${data.nodo_id}` },
  ];

  return (
    <LinkComponent
      to={`/sensor/${data.nodo_id}`}
      breadcrumbPath={breadcrumbPath}
    >
      <div className="rounded p-2 cursor-pointer relative mx-0 flex w-full max-w-full md:pt-[unset] mb-1 transition-all duration-200 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-700">
        <div
          className={`w-3 h-3 mt-3 me-4 rounded-full bg-${getDotColor(data.alerta_id)}-500`}
        ></div>
        <div>
          <p className="text-zinc-950 text-lg dark:text-white font-semibold mb-1">
            {data.titulo}
          </p>
          <p className="text-zinc-950 dark:text-white mb-1">{data.message}</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {obtenerTimeAgoString({ date: new Date(data.fecha_hora) })}
          </p>
        </div>
      </div>
    </LinkComponent>
  );
}

export default NotificationItem;
