import React from "react";

import '../html/_assets/css/style.css'
import '../html/_assets/css/structure.css'
import '../html/_assets/fonts/inter/stylesheet.css'
import '../html/_assets/fonts/awesome/css/stylesheet.css'
import "react-toastify/dist/ReactToastify.css";

import Routing from "./Routing.jsx";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthProvider.jsx";
import {RequestProvider} from "./contexts/RequestProvider.jsx";
import {ParamsProvider} from "./contexts/ParamsProvider.jsx";


export const RouteContext = React.createContext();
export const RequestContext = React.createContext();

function App() {

  return (
      <RequestProvider>
        <AuthProvider>
          <ParamsProvider>
            <BrowserRouter>
              <Routing/>
            </BrowserRouter>
          </ParamsProvider>
        </AuthProvider>
      </RequestProvider>
  )
}

export default App
