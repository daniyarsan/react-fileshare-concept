import React from 'react'
import Forgot from "../../components/Auth/Forgot/Forgot.jsx";
import Links from "./_parts/Links.jsx";


function ForgotPage(props) {
  return (
      <div className="login flex row-1@xs row-1-3@m">
        <div></div>
        <div>
          <Links/>
          <Forgot />
        </div>
        <div></div>
      </div>
  )
}

export default ForgotPage
