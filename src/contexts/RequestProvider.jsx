import React, {createContext} from "react";
import store from "../store/storeUser.js";
import {Requester} from "../service/Requester.js";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  /* CONTEXT STATES */
  const [user,] = store.useState("user")

  const requester = new Requester(user.accessToken, user.refreshToken)


  return (
      <RequestContext.Provider value={{ requester }}>
        {children}
      </RequestContext.Provider>
  );
};