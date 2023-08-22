import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {object, string} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../../api/const.js";
import Links from "../../../pages/Auth/_parts/Links.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";

export const LoginForm = ({onSubmit}) => {
  const [showPassword, setShowPassword] = useState(false)

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

  return (
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
                  <ErrorMessage className="text-danger" name="username" component="small"/>

                  <div className="password mt-1">
                    <div className="bold small">Пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="password"/>
                      <a onClick={() => {setShowPassword(!showPassword)}} className="input-icon">
                        <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                      </a>
                    </div>
                    <ErrorMessage className="text-danger" name="password" component="small"/>

                    <div className="row row_sb">
                      <small className="text-danger"></small>
                      <Link to='/forgot' className="small line link">Забыл пароль?</Link>
                    </div>
                  </div>

                  <button type="submit" className={`col-1@xs btn mt-3 ${(isValid && dirty) && 'active'}`}>Войти</button>

                  <div className="row row_col row_center">
                    <p className="small text-danger center mt-1">Нет аккаунта?
                      <Link to='/registration' className="link line text-dark ml-1">Регистрация</Link>
                    </p>
                  </div>
                </div>
              </Form>
          )}
        </Formik>

      </div>
  )
}
