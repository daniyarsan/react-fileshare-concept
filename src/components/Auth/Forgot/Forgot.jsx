import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {object, ref, string} from "yup";
import {RECOVER_PASSWORD_BY_TOKEN, VALIDATION_MIN_PASSWORD_LENGTH} from "../../../api/const.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Success from "./Success.jsx";
import store from "../../../store/store.js";

const Forgot = () => {
  const {currentUser} = useContext(AuthContext);
  const [loader, setLoader] = store.useState("loader");

  const {requester} = useContext(RequestContext);
  const [recoveryCode, setRecoveryCode] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    reserveCode: '',
    password: '',
    confirmPassword: ''
  }

  const validation = object({
    reserveCode: string().required('Обязательное поле'),
    password: string()
        .required('Обязательное поле').required('Обязательное поле')
        .min(VALIDATION_MIN_PASSWORD_LENGTH, `Не менее ${VALIDATION_MIN_PASSWORD_LENGTH} символов`)
        .matches(/[0-9]/, 'Должен содержать цифру')
        .matches(/[a-z]/, 'Должен содержать прописную букву')
        .matches(/[A-Z]/, 'Должен содержать заглавную букву')
        .matches(/[^\w]/, 'Должен содержать символ'),
    confirmPassword: string().required('Обязательное поле').oneOf([ref('password'), null], 'Пароли должны совпадать')

  })

  const onSubmit = (data, formikHelpers) => {
    setLoader(true)
    requester.post(`${RECOVER_PASSWORD_BY_TOKEN}`, {username: currentUser.username, new_password: data.password, code: data.reserveCode}).then((resp) => {
      setRecoveryCode(resp?.data?.code)
    }).finally(() => {
      setLoader(false)
    })
    // formikHelpers.resetForm()
  }


  if (recoveryCode) {
    return <Success recoveryCode={recoveryCode}/>
  }

  return (
      <div>
        <h3 className="bolder mt-6">Восстановление аккаунта</h3>
        <p className="small bold text-grey">После создания нового пароля, появляется новый код восстановления аккаунта</p>

        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={onSubmit}>
          {({errors, isValid, handleSubmit, touched, dirty}) => (
              <Form onSubmit={handleSubmit}>

                <div className="form mt-2">
                  <div className="relative">
                    <div className="bold small">Резервный код</div>
                    <Field name="reserveCode" className='col-1@xs' type="text"/>
                    <ErrorMessage className="text-grey" name="reserveCode" component="small"/>
                  </div>

                  <div className="password">
                    <div className="bold small mt-1">Новый пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="password"/>
                      <a onClick={() => {
                        setShowPassword(!showPassword)
                      }} className="input-icon">
                        <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                      </a>
                    </div>
                    <ErrorMessage className="text-grey" name="password" component="small"/>
                  </div>

                  <div className="password">
                    <div className="bold small mt-1">Подтвердите пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="confirmPassword"/>
                      <a onClick={() => {
                        setShowPassword(!showPassword)
                      }} className="input-icon">
                        <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                      </a>
                    </div>
                    <ErrorMessage className="text-grey" name="confirmPassword" component="small"/>
                  </div>
                  <button type="submit" className={`col-1@xs btn mt-2 ${(isValid && dirty) && 'active'}`}>Восстановить</button>
                </div>
              </Form>
          )}
        </Formik>
      </div>
  )


}

export default Forgot;