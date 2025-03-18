import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@getpara/react-sdk/styles.css";
import "./index.css";
import App from "./App.tsx";
import { StateContext } from "./context/StateContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContext>
        <App />
      </StateContext>
    </QueryClientProvider>
  </StrictMode>
);
