import {Outlet} from "react-router-dom";
import React from 'react'
import Header from "./_parts/Header.jsx";
import Footer from "./_parts/Footer.jsx";

function Default() {

  return (
      <div className="row row_col row_sb">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  )
}

export default Default
