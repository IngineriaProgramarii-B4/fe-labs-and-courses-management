import {Navigate} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import LoginProtected from "../pages/LoginProtected/LoginProtected";
import Catalog from "../pages/Catalog/Catalog";
import NetworkCard from "../components/NetworkCard/NetworkCard";
import Subjects from "../pages/Subject/Subjects";
import SelectedSubject from "../pages/Subject/SelectedSubject";
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
    element: <NotFound />,
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
        element: <div>test</div>,
      },
      {
        path: "/catalog",
        element: <PrivateRouteComponent component={Catalog} path="/catalog" />,
      },
      {
        path: "/subjects",
        element: <PrivateRouteComponent component={Subjects} path="/subjects" />,
      },
      {
        path: "/selectedSubject",
        element: <PrivateRouteComponent component={SelectedSubject} path="/selectedSubject" />,
      },
    ],
  },
  {
    path: "/login",
    index: true,
    element: <Login />,
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
