import React from "react";
import { FaRegBell } from "react-icons/fa";

const NotificationButton = () => {
  return (
    <button
      onClick={() => console.log("Hacer algo ... algo...")}
      type="button"
      className="relative rounded-full p-2 transition-all duration-200 ease-in-out bg-transparent 
                 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
    >
      {/* Fondo de escala y badge */}
      <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
      <FaRegBell
        aria-hidden="true"
        className="h-6 w-6 transition-transform transform active:scale-90"
      />
    </button>
  );
};

export default NotificationButton;
