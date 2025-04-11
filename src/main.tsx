import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Environment, ParaProvider } from "@getpara/react-sdk";
import "@getpara/react-sdk/styles.css";
import "./index.css";
import App from "./App.tsx";
const queryClient = new QueryClient();

const CapsuleParasApi = import.meta.env.VITE_PARA_API_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ParaProvider
        paraClientConfig={{
          env: Environment.BETA,
          apiKey: CapsuleParasApi,
        }}
      >
        <App />
      </ParaProvider>
    </QueryClientProvider>
  </StrictMode>
);
