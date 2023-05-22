import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import LoginProtected from "../pages/LoginProtected/LoginProtected";
import NetworkCard from "../components/NetworkCard/NetworkCard";
import SubjectAlex from "../pages/Subject/SubjectAlex";
import SubjectAna from "../pages/Subject/SubjectAna";
import Register from "../pages/Register/Register";
import Reset from "../pages/ResetPassword/Reset";
import SendMail from "../pages/SendEmail/SendMail";
import RemindersCard from "../components/RemindersCard/RemindersCard";
import Catalog from "../pages/Catalog/Catalog";
import FormInfo from "../pages/InsertData/Form";
import RemindersContextProvider from "../components/RemindersCard/RemindersContext";
import UserContextProvider from "../components/UserContext/UserContext";
import api from "../services/api"
import jwt_decode from "jwt-decode";

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
                                                              path
                                                            }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

function RemindersWrapper() {
  return (
    <RemindersContextProvider>
      <RemindersCard />
    </RemindersContextProvider>
  );
}

function NetworkWrapper() {
  return (
    <UserContextProvider>
      <NetworkCard />
    </UserContextProvider>
  );
}


interface DecodedToken {
  role: string;
}

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwt_decode(token);
    return decoded.role; 
  } catch (error) {
    console.error("Token-ul nu a putut fi decodat.", error);
    return null;
  }
};

const isAdmin = () => {
  const token = localStorage.getItem("token");
  const role = getUserRole(); // așteptăm ca această funcție să ne returneze rolul utilizatorului
  return !!token && role === 'ADMIN';
};

type AdminRouteProps = {
  component: React.ComponentType<any>;
  path: string;
};


const AdminRouteComponent: React.FC<AdminRouteProps> = ({
  component: Component,
  path
}) => {
  return isAdmin() ? <Component /> : <Navigate to="/home" replace />;
};


export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/admin",
    element: <AdminRouteComponent component={FormInfo} path="/admin" />
  },
  {
    path: "/",
    element: <LoginProtected />,
    children: [
      {
        path: "/home",
        element: <PrivateRouteComponent component={Home} path="/home" />
      },
      {
        path: "/network/:param",
        element: <PrivateRouteComponent component={NetworkWrapper} path="/network/:param" />
      },
      {
        path: "/",
        element: <Navigate to={"/login"} />
      },
      {
        path: "/reminders",
        element: <PrivateRouteComponent component={RemindersWrapper} path="/reminders" />
      },
      {
        path: "/index",
        element: <Navigate to={"/home"} />
      },
      {
        path: "/test",
        element: <div>test</div>
      },
      {
        path: "/catalog/:id",
        element: <Catalog />
      },
      {
        path: "/subjectAlex",
        element: <PrivateRouteComponent component={SubjectAlex} path="/subjectAlex" />
      },
      {
        path: "/subjectAna",
        element: <PrivateRouteComponent component={SubjectAna} path="/subjectAna" />
      }
      
    ]
  },
  {
    path: "/login",
    index: true,
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/resetPassword",
    element: <Reset />
  },
  {
    path: "/sendMail",
    element: <SendMail />
  },
]);
