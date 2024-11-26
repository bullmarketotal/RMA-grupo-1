function Notificationitem() {   
    return ( 
        <div className="relative mx-auto flex w-full max-w-full md:pt-[unset] mb-6">
              <div className="w-3 h-3 mt-1 me-4 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-zinc-950 dark:text-white font-medium mb-1">
                  You have a new message!
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                  1 hour ago
                </p>
              </div>
      </div>
     );
}

export default Notificationitem;