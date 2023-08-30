import {Outlet} from "react-router-dom";
import React from 'react'
import Header from "./_parts/Header.jsx";
import Footer from "./_parts/Footer.jsx";
import {ToastContainer} from "react-toastify";

function Default({className, ...props}) {

  return (
      <div className={className}>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer/>
      </div>
  )
}

export default Default
