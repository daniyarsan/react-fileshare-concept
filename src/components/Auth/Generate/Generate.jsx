import React, {useContext, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {object, string} from "yup";
import Success from "./Success.jsx";
import {RECOVER_TOKEN} from "../../../api/const.js";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import store from "../../../store/store.js";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";

const Generate = () => {
  const {requester} = useContext(RequestContext)
  const [recoveryCode, setRecoveryCode] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const { setLoader } = useContext(AuthContext)

  const initialValues = {
    password: ''
  }

  const validation = object({
    password: string().required('Обязательное поле')
  })

  const onSubmit = (data, formikHelpers) => {
    setLoader(true)

    requester.post(`${RECOVER_TOKEN}`, {password: data.password}).then(({data}) => {
      setRecoveryCode(data?.code)
    }).finally(() => {
      setLoader(false)
    })

    formikHelpers.resetForm()
  }


  if (recoveryCode) {
    return <Success {...{recoveryCode}} />
  }

  return (
      <div>
        <div className="row row_center row_sb mt-6">
          <h3 className="bolder">Создайте резервный код</h3>
        </div>
        <p className="mt-1">
          <span className="text-orange">Резервный код - это единственный путь восстановить доступ к аккаунту</span>, случае если Вы забыли или потеряли
          данные для входа. Администраторам и пользователям следует хранить резервный код в безопасном месте.
        </p>

        <div className="mt-2">
          <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={onSubmit}>
            {({errors, isValid, handleSubmit, touched, dirty}) => (
                <Form onSubmit={handleSubmit}>
                  <div className="password mt-1">
                    <div className="bold small">Пароль</div>
                    <div className="relative">
                      <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="password"/>
                      <span className="input-icon" onClick={() => {
                        setShowPassword(!showPassword)
                      }}>
                          <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                        </span>
                    </div>
                    <ErrorMessage className="text-grey" name="password" component="small"/>
                  </div>

                  <button type="submit" className={`col-1@xs btn mt-2 ${(isValid && dirty) && 'active'}`}>Сгенерировать код</button>
                </Form>
            )}
          </Formik>

          <Link to='/' className="small center link line text-dark">Нет, спасибо</Link>
        </div>
      </div>
  )
};

export default Generate;