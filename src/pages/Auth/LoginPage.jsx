import React from 'react'
import {LoginForm} from "../../components/Auth/Login/LoginForm.jsx";


export function LoginPage(props) {

  return (
      <div className="login flex row-1@xs row-1-3@m">
        <div></div>
        <LoginForm/>
        <div></div>
      </div>
  )
}

