import Notificationitem from "../atoms/NotificationItem";

function NotificationList() {
  return (
      <div className="absolute top-20 right-0 z-40  mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] max-w-[520px] lg:px-6 xl:pl-0">
        <div className="relative flex bg-opacity-0 w-full normal-bg flex-col pt-[20px] md:pt-0">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mr-0 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800 md:mb-0">
            <div>
              <p className="text-base font-extrabold text-zinc-950 dark:text-white md:text-3xl">
                Notificaciones
              </p>
              <p className="mb-5 mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-4 md:text-base">
                You have 3 unread messages.
              </p>
            </div>
            
            <Notificationitem/>
            <Notificationitem/>
            <button className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="me-2 h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Mark all as read
            </button>
          </div>
        </div>
      </div>
  );
}

export default NotificationList;
