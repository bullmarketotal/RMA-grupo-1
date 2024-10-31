import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const showNotification = (message, type = "success") => {
    toast[type](message);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer 
        autoClose={2500}       // Duración en milisegundos (5000ms = 5 segundos)
        hideProgressBar={false} // Muestra la barra de progreso
        newestOnTop={true}      // Muestra la última notificación en la parte superior
        pauseOnHover            // Pausa la notificación al pasar el cursor sobre ella
        style={{ marginTop: "50px" }} // Baja la notificación 50 píxeles desde el borde superior
      />
    </NotificationContext.Provider>
  );
};
