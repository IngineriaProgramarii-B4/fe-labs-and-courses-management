import React from 'react';
import {router} from "./services/router";
import {RouterProvider} from "react-router-dom";

const App = () => {
  return <div className={'min-h-screen'}>
    <RouterProvider router={router}/>
  </div>
};

export default App;