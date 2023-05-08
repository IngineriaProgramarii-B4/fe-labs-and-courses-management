import {Navigate} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import LoginProtected from "../pages/LoginProtected/LoginProtected";
import Catalog from "../pages/Catalog/Catalog";
import NetworkCard from "../components/NetworkCard/NetworkCard";
import SubjectAlex from "../pages/Subject/SubjectAlex";
import SubjectAna from "../pages/Subject/SubjectAna";
import Register from "../pages/Register/Register";
import Reset from "../pages/ResetPassword/Reset";
import SendMail from "../pages/SendEmail/SendMail";
import RemindersPage from '../components/RemindersCard/ReminderPage';
import TeachersPage from '../components/TeacherInfo/TeacherPage';

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  path: string;
};

const PrivateRouteComponent: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
}) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <LoginProtected />,
    children: [
      {
        path: "/home",
        element: <PrivateRouteComponent component={Home} path="/home" />,
      },
      {
        path: "/network",
        element: <PrivateRouteComponent component={NetworkCard} path="/network" />,
      },
      {
        path: "/teachers",
        element: <PrivateRouteComponent component={TeachersPage} path="/teachers" />,
      },
      {
        path: "/",
        element: <Navigate to={"/login"} />,
        index: true,
        element: <Login />
      },
      
      },

      {
        path: "/reminders",
        element: <PrivateRouteComponent component={RemindersPage} path="/reminders" />,
      },
      {
        path: "/index",
        element: <Navigate to={"/login"} />,

      },
      {
        path: "/test",
        element: <div>test</div>
      },
      {
        path: "/catalog",
        element: <PrivateRouteComponent component={Catalog} path="/catalog" />,
      },
      {
        path: "/subjectAlex",
        element: <PrivateRouteComponent component={SubjectAlex} path="/subjectAlex" />,
      },
      {
        path: "/subjectAna",
        element: <PrivateRouteComponent component={SubjectAna} path="/subjectAna" />,
      },
    ],
  },
  {
    path: "/login",
    index: true,
    element: <Login />,
    index: true
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <Reset />
  },
  {
    path: "/sendMail",
    element: <SendMail />
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <Reset />,
  },
  {
    path: "/sendMail",
    element: <SendMail />,
  },
]);
