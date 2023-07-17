import {Outlet} from "react-router-dom";
import Footer from "./_parts/Footer.jsx";
import Header from "./_parts/Header.jsx";

function Auth() {

  return (
      <div className='bgPeach'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  )
}

export default Auth
