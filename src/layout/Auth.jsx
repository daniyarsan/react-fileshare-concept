import {Outlet} from "react-router-dom";
import Footer from "./_parts/Footer.jsx";
import {ToastContainer} from "react-toastify";

function Auth() {

  return (
      <>
        <Outlet/>
        <Footer/>
        <ToastContainer/>
      </>
  )
}

export default Auth