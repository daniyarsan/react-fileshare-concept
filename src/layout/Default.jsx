import {Outlet} from "react-router-dom";
import React, {useContext} from 'react'
import Header from "./_parts/Header.jsx";
import Footer from "./_parts/Footer.jsx";
import {ToastContainer} from "react-toastify";
import {Preloader} from "../components/UI/Preloader/index.js";
import {AuthContext} from "../contexts/AuthProvider.jsx";

function Default({className}) {
  const { loader, setLoader } = useContext(AuthContext);


  return (
      <div className={className}>

        {loader && (<Preloader/>)}

        <Header/>
        <section className="canvas">
          <div className="container">
            <Outlet/>
          </div>
        </section>
        <Footer/>
        <ToastContainer/>
      </div>
  )
}

export default Default
