import { createBrowserRouter } from "react-router-dom";

//--- Layout Modules
import Login from "@modules/Login";
import Dashboard from "@modules/Dashboard";
import Root from "@src/layout/Root";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        index: true,
        path:'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>NotFound</div>,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
