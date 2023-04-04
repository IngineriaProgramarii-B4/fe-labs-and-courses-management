import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";

function LoginProtected() {
  const isLoggedIn = true; //this should be changed with a proper way of checking if a user is logged in (bafta George)
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  
  }
  return <>
      <Navbar />
      <Outlet />
      </>
}

export default LoginProtected;