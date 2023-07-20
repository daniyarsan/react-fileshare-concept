import React, {useState} from 'react'
import Links from "./_parts/Links.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {object, ref, string} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/const.js";
import {ErrorMessage, Field, Form, Formik} from "formik";


function ForgotPage(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    // dispatch(registration({username: data.username, password: data.password})).then(({payload}) => {
    //   setRecoveryCode(payload?.recovery_code)
    // })
    formikHelpers.resetForm()
  }


  return (
      <section className="canvas login">
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>
            <div>

              <Links/>

              <h3 className="bolder mt-6">Восстановление доступа</h3>
              <p className="small bold text-grey">Введите Ваши данные для восстановления доступа</p>

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

                        <div className="col-1@xs btn mt-2">Восстановить</div>

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

export default ForgotPage
