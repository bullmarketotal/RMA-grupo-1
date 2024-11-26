import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./context/AppProviders";
import { BreadcrumbProvider } from "./context/BreadcrumbsContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./pages/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <NotificationProvider>
          <ThemeProvider>
            <BreadcrumbProvider>
              <AppRoutes />
            </BreadcrumbProvider>
          </ThemeProvider>
        </NotificationProvider>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
