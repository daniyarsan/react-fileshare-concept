import React, {useState} from 'react'
import Links from "../../../pages/Auth/_parts/Links.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {bool, object, ref, string} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../../api/const.js";

export const RegistrationForm = ({onSubmit}) => {
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  }

  const validation = object({
    username: string().required('Обязательное поле'),
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

  return (
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
                    <Field name="username" className='col-1@xs' type="text"/>
                    <ErrorMessage className="text-danger" name="username" component="small"/>
                  </div>

                  <div className="password mt-1">
                    <div className="bold small">Пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="password"/>
                      <a onClick={() => {
                        setShowPassword(!showPassword)
                      }} className="input-icon">
                        <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                      </a>
                    </div>
                    <ErrorMessage className="text-danger" name="password" component="small"/>
                  </div>

                  <div className="password mt-1">
                    <div className="bold small mt-1">Подтвердите пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="confirmPassword"/>
                      <a onClick={() => {
                        setShowPassword(!showPassword)
                      }} className="input-icon">
                        <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                      </a>
                    </div>
                    <ErrorMessage className="text-danger" name="confirmPassword" component="small"/>
                  </div>

                  <div className="accept-rules mt-2">
                    <label className="checkbox row">
                      <Field type="checkbox" name="termsAndConditions"/>
                      <p className="small ml-1">Я принимаю<Link to="/terms" className="link line"> Условия обслуживания Softbox</Link>. Из нашей<Link to='/policy' className="link line"> Политики конфеденциальности</Link>. Вы узнаете о том, как мы используем и защищаем Ваши данные.
                      </p>
                    </label>
                  </div>

                  <button type="submit" className={`col-1@xs btn mt-2 ${(isValid && dirty) && 'active'}`}>Далее</button>

                  <div className="row row_col row_center">
                    <p className="small text-danger center mt-1">Уже есть аккаунт?
                      <Link to='/login' className="link line text-dark ml-1">Войти</Link>
                    </p>
                  </div>
                </div>
              </Form>
          )}
        </Formik>
      </div>
  )
}
