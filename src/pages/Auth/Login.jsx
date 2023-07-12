import React from 'react'
import {Link} from "react-router-dom";
import {Formik, Form, ErrorMessage, Field} from "formik";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/conf.js";
import {object, string} from "yup";
import Links from "./_parts/Links.jsx";


function Login(props) {

  const initialValues = {
    username: '',
    password: ''
  }
  const validation = object({
    username: string().required('Обязательное поле').email('Некорректный Email формат'),
    password: string()
        .required('Обязательное поле')
        .min(VALIDATION_MIN_PASSWORD_LENGTH, `Пароль должен быть мин ${VALIDATION_MIN_PASSWORD_LENGTH} символов`)
  })

  const onSubmit = (data, formikHelpers) => {
    console.log('submitted')

    // formikHelpers.resetForm()
  }

  return (
      <section className="login">
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
                  onSubmit={(data, formikHelpers) => {
                    console.log('submitting')

                  }}>

                {({errors, isValid,handleSubmit, touched, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="relative">
                        <div className="bold small">Логин</div>
                        <Field name="username" className='col-1@xs' type="email" />
                      </div>
                      <ErrorMessage className="text-grey" name="username" component="small"/>

                      <div className="password mt-1">
                        <div className="bold small">Пароль</div>
                        <div className="relative">
                          <Field className='input-password col-1@xs' type="password" name="password"/>
                          <div className="input-icon">
                            <i className="eye fa-solid fa-eye-slash"></i>
                          </div>
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
