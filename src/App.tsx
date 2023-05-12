import React from "react";
import { router } from "./services/router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./components/UserContext/UserContext";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <div className={"min-h-screen"}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </div>
    </>
  );
};

export default App;
