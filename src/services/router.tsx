import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import LoginProtected from "../pages/LoginProtected/LoginProtected";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: '/',
    element: <LoginProtected />,
    children: [
      {
        path: '/home',
        index: true,
        element: <Home />
      },
      {
        path: '/',
        element: <Navigate to={'/home'} />
      },
      {
        path: '/index',
        element: <Navigate to={'/home'} />
      },
      {
        path: '/test',
        element: <div>test</div>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])