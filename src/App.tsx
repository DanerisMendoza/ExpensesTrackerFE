import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@src/routes/Router";
import "@mantine/core/styles.css";
import "@src/index.css";

export default function App() {
  
  // url profiler
  let previousUrl = '';
  const observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      console.log(`URL changed to ${location.href}`);
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
