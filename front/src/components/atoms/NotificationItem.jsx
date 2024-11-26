function NotificationItem({data}) {   
    console.log("data: ", data)
    return ( 
        <div className="relative mx-auto flex w-full max-w-full md:pt-[unset] mb-6">
              <div className="w-3 h-3 mt-3 me-4 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-zinc-950 text-lg dark:text-white font-semibold mb-1">
                  {data.titulo}
                </p>
                <p className="text-zinc-950 dark:text-white mb-1">
                  {data.message}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {data.fecha_hora.toString()}
                </p>
              </div>
      </div>
     );
}

export default NotificationItem;