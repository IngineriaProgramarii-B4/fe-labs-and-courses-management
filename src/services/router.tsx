import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import LoginProtected from "../pages/LoginProtected/LoginProtected";
import Catalog from "../pages/Catalog/Catalog";
import NetworkCard from "../components/NetworkCard/NetworkCard";

import SubjectAlex from "../pages/Subject/SubjectAlex";
import SubjectAna from "../pages/Subject/SubjectAna";
import RemindersCard from "../components/RemindersCard/RemindersCard";
import RemindersContextProvider from "../components/RemindersCard/RemindersContext";
import TeacherInfoCard from "../components/TeacherInfo/TeacherInfoCard";

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
        path: "/network",
        element: <NetworkCard />,
      },
      {
        path: "/teachers",
        element: <TeacherInfoCard />,
      },
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/reminders",
        element: (
          <RemindersContextProvider>
            <RemindersCard />
          </RemindersContextProvider>
        ),
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
      {
        path: "/subjectAlex",
        element: <SubjectAlex />,
      },
      {
        path: "/subjectAna",
        element: <SubjectAna />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
