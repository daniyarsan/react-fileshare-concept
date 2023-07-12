import {Outlet} from "react-router-dom";
import Footer from "./_parts/Footer.jsx";

function Auth() {

  return (
      <>
        <Outlet/>
        <Footer/>
      </>
  )
}

export default Auth
