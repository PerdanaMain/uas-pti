import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dash from "./pages/Dashboard";
import ErrPage from "./pages/Notfound";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dash />,
    errorElement: <Navigate to="/404" />,
  },

  {
    path: "/404",
    element: <ErrPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
