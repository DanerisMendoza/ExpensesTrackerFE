import { createBrowserRouter } from "react-router-dom";

// Layout 
import ProtectedLayout from "@src/layout/protected/Layout";
import PublicLayout from "@src/layout/public/Layout";
// Modules
import Login from "@modules/Login";
import Dashboard from "@modules/Dashboard";
import LandingPage from "@src/modules/LandingPage";
import Register from "@src/modules/Register";


const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  // Protected routes
  {
    element: <ProtectedLayout />, 
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  // Not found
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router
