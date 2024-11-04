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
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
