import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Formik, Form, ErrorMessage, Field} from "formik";
import {AUTH_TOKEN, VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/const.js";
import {object, string} from "yup";
import Links from "./_parts/Links.jsx";
import {useDispatch} from "react-redux";
import {login, setUserData} from "../../store/slices/userSlice.js";
import {getUserStat} from "../../api/manager.js";


function Login(props) {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const initialValues = {
    username: '',
    password: ''
  }
  const validation = object({
    username: string().required('Обязательное поле'),
    password: string()
        .required('Обязательное поле')
        .min(VALIDATION_MIN_PASSWORD_LENGTH, `Пароль должен быть мин ${VALIDATION_MIN_PASSWORD_LENGTH} символов`)
  })

  const onSubmit = (data, formikHelpers) => {

    dispatch(login(data)).then((resp) => {
      getUserStat().then(({data}) => {
        dispatch(setUserData(data))
      })
      navigate('/');
    })
    formikHelpers.resetForm()
  }

  return (
      <section className="canvas login">
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>

            <div>
              <Links active='login'/>

              <h3 className="bolder mt-6">С возвращением!</h3>
              <p className="small bold text-grey">Введите Ваши данные для входа</p>

              <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  onSubmit={onSubmit}>

                {({errors, isValid, handleSubmit, touched, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="form mt-2">
                        <div className="relative">
                          <div className="bold small">Логин</div>
                          <Field name="username" className='col-1@xs' type="text"/>
                        </div>
                        <ErrorMessage className="text-grey" name="username" component="small"/>

                        <div className="password mt-1">
                          <div className="bold small">Пароль</div>
                          <div className="relative">
                            <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="password"/>
                            <a onClick={() => {setShowPassword(!showPassword)}} className="input-icon">
                              <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                            </a>
                          </div>
                          <ErrorMessage className="text-grey" name="password" component="small"/>

                          <div className="row row_sb">
                            <small className="text-grey"></small>
                            <Link to='/forgot' className="small line link">Забыл пароль?</Link>
                          </div>
                        </div>

                        <button type="submit" className={`col-1@xs btn mt-3 ${(isValid && dirty) && 'active'}`}>Войти</button>

                        <div className="row row_col row_center">
                          <p className="small text-grey center mt-1">Нет аккаунта?
                            <Link to='/registration' className="link line text-dark ml-1">Регистрация</Link>
                          </p>
                        </div>
                      </div>
                    </Form>
                )}
              </Formik>

            </div>

            <div></div>
          </div>
        </div>

      </section>
  )
}

export default Login
