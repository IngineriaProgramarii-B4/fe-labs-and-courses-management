import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import React from 'react';


import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Reset from "../pages/ResetPassword/Reset";
import LoginProtected from "../pages/LoginProtected/LoginProtected";
import Catalog from "../pages/Catalog/Catalog";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <LoginProtected />,
    children: [
      {
        path: "/home",
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/index",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/test",
        element: <div>test</div>,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <Reset />
  }
  
]);
