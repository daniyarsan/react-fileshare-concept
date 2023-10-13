import React, {createContext, useContext, useEffect} from "react";
import store from "../store/store.js";
import {RequestContext} from "./RequestProvider.jsx";
import {LOGIN, USER_STAT} from "../api/const.js";
import {User} from "../models/User.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const {requester} = useContext(RequestContext);

  /* CONTEXT STATES */
  const [user, setUser, updateUser] = store.useState("user");
  const [pendingPayment, setPendingPayment] = store.useState("pendingPayment");


  /* CONTEXT ACTIONS */
  const updateAction = () => {
    requester.get(`${USER_STAT}`).then(({data}) => {
      updateUser(user => {
        Object.keys(data).forEach(key => user[key] = data[key])
      })
    })
  }

  const loginAction = (data) => {
    requester.post(`${LOGIN}`, data).then(({data}) => {
      requester.setToken(data.access_token)

      requester.get(`${USER_STAT}`).then((resp) => {
        const userData = resp.data
        userData.isAuthorized = true
        userData.accessToken = data.access_token
        userData.refreshToken = data.refresh_token

        setUser(userData)
      })
    })
  }

  const logoutAction = () => {setUser({})}
  
  if (user.isAuthorized) {
    if (pendingPayment) {
      updateAction()
      setPendingPayment(false)
    }
  }

  const currentUser = new User(user)

  return (
      <AuthContext.Provider value={{currentUser, loginAction, logoutAction}}>
        {children}
      </AuthContext.Provider>
  )
}