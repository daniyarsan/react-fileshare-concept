import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {registration} from "../../store/slices/userSlice.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {RegistrationForm} from "../../components/Auth/Registration/RegistrationForm.jsx";
import RegistrationSuccess from "../../components/Auth/Registration/RegistrationSuccess.jsx";

function RegistrationPage(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState(null)


  const onSubmit = (data, formikHelpers) => {
    setLoading(true)
    
    dispatch(registration({username: data.username, password: data.password})).then((result) => {
      if (!result.type.toLowerCase().includes('rejected')) {
        setRecoveryCode(result?.payload?.code)
      }
      setLoading(false)
    })
  }


  return (
      <>
        {loading && <Preloader/>}
        <section className="canvas login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              {recoveryCode ? <RegistrationSuccess {...{recoveryCode}} /> : <RegistrationForm {...{onSubmit, recoveryCode}} /> }
              <div></div>
            </div>
          </div>
        </section>

      </>
  )
}

export default RegistrationPage
