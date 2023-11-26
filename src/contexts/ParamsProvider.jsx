import React, {createContext} from "react";

export const ParamsContext = createContext();

export const ParamsProvider = ({children}) => {

  return (
      <ParamsContext.Provider value={{}}>
        {children}
      </ParamsContext.Provider>
  )
}