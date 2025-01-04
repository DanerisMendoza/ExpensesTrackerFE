import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </React.Fragment>
    </MantineProvider>
  </React.StrictMode>
);
