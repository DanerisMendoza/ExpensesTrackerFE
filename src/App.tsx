import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@src/routes/Router";
import "@mantine/core/styles.css";
import "@src/index.css";

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
