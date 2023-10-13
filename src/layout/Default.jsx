import {Outlet} from "react-router-dom";
import React, {useEffect} from 'react'
import Header from "./_parts/Header.jsx";
import Footer from "./_parts/Footer.jsx";
import {ToastContainer} from "react-toastify";
import {Preloader} from "../components/UI/Preloader/index.js";
import store from "../store/store.js";

function Default({className}) {
  const [loader, setLoader] = store.useState("loader");


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
