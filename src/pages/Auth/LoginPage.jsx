import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login, setUserData} from "../../store/slices/userSlice.js";
import {getUserStat} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {LoginForm} from "../../components/Auth/Login/LoginForm.jsx";
import {useNavigate} from "react-router-dom";


export const LoginPage = (props) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (data, formikHelpers) => {
    setLoading(true)
    dispatch(login(data)).then((resp) => {
      getUserStat().then(({data}) => {
        dispatch(setUserData(data))
        setLoading(false)
      })
    })
    // formikHelpers.resetForm()
  }

  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              <LoginForm {...{onSubmit}} />
              <div></div>
            </div>
          </div>

        </section>
      </>
  )
}

