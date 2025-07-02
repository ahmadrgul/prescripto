import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";
import { AnimatePresence } from "framer-motion";
import ErrorBoundry from "./components/ErrorBoundry.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundry>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AnimatePresence mode="wait">
              <App />
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundry>
  </StrictMode>,
);
