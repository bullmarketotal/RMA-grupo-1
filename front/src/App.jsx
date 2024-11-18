import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./pages/AppRoutes";
import { AxiosProvider } from "./context/AxiosProvider";

function App() {
  return (
    <BrowserRouter>
      <AxiosProvider>
        <AuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </NotificationProvider>
        </AuthProvider>
      </AxiosProvider>
    </BrowserRouter>
  );
}

export default App;
