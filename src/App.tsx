import { StrictMode } from "react";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";

import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@src/index.css";

import { router } from "@src/routes/Router";

export default function App() {
  return (
    // <StrictMode>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    // </StrictMode>
    );
}
