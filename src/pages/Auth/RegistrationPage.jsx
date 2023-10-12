import React, {useState} from 'react'
import {Preloader} from "../../components/UI/Preloader/index.js";
import {RegistrationForm} from "../../components/Auth/Registration/RegistrationForm.jsx";
import RegistrationSuccess from "../../components/Auth/Registration/RegistrationSuccess.jsx";
import Registration from "../../components/Auth/Registration/Registration.jsx";

function RegistrationPage(props) {



  return (
      <>
        {/*{loading && <Preloader/>}*/}
        <section className="canvas login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              <Registration />
              <div></div>
            </div>
          </div>
        </section>

      </>
  )
}

export default RegistrationPage
