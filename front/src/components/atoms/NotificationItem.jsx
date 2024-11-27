import { obtenerTimeAgoString } from "../utils/date";

const getDotColor = (alert_id) => {
  if (alert_id === 1) return "yellow";
  if (alert_id === 2) return "orange";
  if (alert_id === 3) return "red";
  return "sky";
};

function NotificationItem({ data }) {

  return (
    // intente usar un LinkComponent pero bugeaba la informacion del nodo
    <a
      href={`/sensor/${data.nodo_id}`}
    >
      <div className="rounded p-2 cursor-pointer relative mx-0 flex w-full max-w-full md:pt-[unset] mb-1 transition-all duration-200 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-700">
        <div
          className={`w-3 h-3 mt-3 me-4 rounded-full bg-${getDotColor(data.alerta_id)}-500`}
        ></div>
        <div>
          <p className={`text-${data.is_read ? "zinc-500" : "zinc-950"} text-lg dark:text-${data.is_read ? "gray-500" : "white"} font-semibold mb-1`}>
            {data.titulo}
          </p>
          <p className={`text-zinc-${data.is_read ? "500" : "950"} dark:text-${data.is_read ? "gray-500" : "white"} mb-1`}>{data.message}</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {obtenerTimeAgoString({ date: new Date(data.fecha_hora) })}
          </p>
        </div>
      </div>
    </a>
  );
}

export default NotificationItem;
