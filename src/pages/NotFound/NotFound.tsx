import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function NotFound() {
  const navigation = useNavigate();

  return (
    <>
      <div>Page not found</div>
      <Button onClick={() => navigation("/")}>Go home</Button>
    </>
  );
}

export default NotFound;