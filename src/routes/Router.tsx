import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";

// Layout 
import ProtectedLayout from "@src/layout/protected/Layout";
import PublicLayout from "@src/layout/public/Layout";
// Modules
import Login from "@modules/Login";
import Dashboard from "@modules/Dashboard";
import LandingPage from "@src/modules/LandingPage";
import Register from "@src/modules/Register";

// Mock authentication function
const isAuthenticated = () => {
  return Boolean(sessionStorage.getItem("accessTokenFlash"));
};

// Authentication wrapper
const RequireAuth: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Redirect wrapper for public routes
const RedirectIfAuthenticated: React.FC = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  // Public routes
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      }
    ],
  },
  // Protected routes
  {
    element: <RequireAuth />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  // Not found
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
