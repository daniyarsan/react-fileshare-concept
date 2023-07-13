import React from 'react'
import {Link} from "react-router-dom";
import Links from "./_parts/Links.jsx";
import {object, string, ref, bool} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/conf.js";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Registration(props) {

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  }

  const validation = object({
    username: string().required('Обязательное поле').email('Некорректный Email формат'),
    password: string()
        .required('Обязательное поле').required('Обязательное поле')
        .min(VALIDATION_MIN_PASSWORD_LENGTH, `Не менее ${VALIDATION_MIN_PASSWORD_LENGTH} символов`)
        .matches(/[0-9]/, 'Должен содержать цифру')
        .matches(/[a-z]/, 'Должен содержать прописную букву')
        .matches(/[A-Z]/, 'Должен содержать заглавную букву')
        .matches(/[^\w]/, 'Должен содержать символ'),
    confirmPassword: string().required('Обязательное поле').oneOf([ref('password'), null], 'Пароли должны совпадать'),
    termsAndConditions: bool().oneOf([true], 'You need to accept the terms and conditions'),

  })

  const onSubmit = (data, formikHelpers) => {
    console.log('submitted')

    // formikHelpers.resetForm()
  }

  return (
      <>
        <section className="login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              <div>

                <Links active='registration'/>

                <h3 className="bolder mt-6">Добро пожаловать!</h3>
                <p className="small bold text-grey">Создайте аккаунт для продолжения</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}>
                  {({errors, isValid, handleSubmit, touched, dirty}) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="form mt-2">
                          <div>
                            <div className="bold small">Логин</div>
                            <Field name="username" className='col-1@xs' type="email"/>
                            <ErrorMessage className="text-grey" name="username" component="small"/>
                          </div>

                          <div className="password mt-1">
                            <div className="bold small">Пароль</div>
                            <div className="relative">
                              <Field className='input-password col-1@xs' type="password" name="password"/>
                              <div className="input-icon">
                                <i className="eye fa-solid fa-eye-slash"></i>
                              </div>
                            </div>
                            <ErrorMessage className="text-grey" name="password" component="small"/>
                          </div>

                          <div className="password mt-1">
                            <div className="bold small mt-1">Подтвердите пароль</div>
                            <div className="relative">
                              <Field className='input-password col-1@xs' type="password" name="confirmPassword"/>
                              <div className="input-icon">
                                <i className="eye fa-solid fa-eye-slash"></i>
                              </div>
                            </div>
                            <ErrorMessage className="text-grey" name="confirmPassword" component="small"/>
                          </div>

                          <div className="accept-rules mt-2">
                            <label className="checkbox row">
                              <Field type="checkbox" name="termsAndConditions" />
                              <p className="small ml-1">Я принимаю
                                <a href="" className="link line">Условия обслуживания Softbox</a>. Из нашей
                                <a href="" className="link line">Политики конфеденциальности</a> Вы узнаете о том, как мы используем и защищаем Ваши данные.
                              </p>
                            </label>
                          </div>

                          <button type="submit" className={`col-1@xs btn mt-2 ${(isValid && dirty) && 'active'}`}>Далее</button>

                          <div className="row row_col row_center">
                            <p className="small text-grey center mt-1">Уже есть аккаунт?
                              <Link to='/login' className="link line text-dark ml-1">Войти</Link>
                            </p>
                          </div>
                        </div>
                      </Form>
                  )}
                </Formik>

              </div>
            </div>
          </div>
        </section>
      </>
  )
}

export default Registration
