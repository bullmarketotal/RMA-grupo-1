import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./pages/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
