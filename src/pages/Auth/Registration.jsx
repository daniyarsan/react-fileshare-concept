import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Links from "./_parts/Links.jsx";
import {object, string, ref, bool} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/const.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {registration} from "../../store/slices/userSlice.js";
import {toast} from "react-toastify";

function Registration(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recoveryCode, setRecoveryCode] = useState(null)
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

  const onSubmit = (data, formikHelpers) => {
    dispatch(registration({username: data.username, password: data.password})).then(({payload}) => {
      setRecoveryCode(payload?.recovery_code)
    })
    formikHelpers.resetForm()
  }

  /* Page HTML parts */
  const RecoveryCodeHtml = () => (
      <>
        <div className="row row_center row_sb mt-6">
          <h3 className="bolder">Ваш резервный код</h3>
        </div>
        <p className="mt-1"><span className="text-orange">Резервный код - это единственный путь восстановить доступ к аккаунту</span>, в случае если Вы забыли или
          потеряли данные для входа. Администраторам и пользователям следует хранить резервный код в безопасном месте.</p>
        <div className="mt-2 row row_center">
          <div>
            <div id="copytoClipboard-alert" className="custom-alert-wrapper relative hidden">
              <div className="custom-alert">
                <div className="body row">
                  <div>
                    <p className="bolder">Скопировано</p>
                  </div>
                  <div className="img-contain ml-1">
                    <img src="" alt=""/>
                  </div>
                </div>
              </div>
            </div>
            <div id="shareLink" className="bold text-overflow">{recoveryCode}</div>
          </div>

          <div className="link bold ml-1" onClick={() => {
            navigator.clipboard.writeText(recoveryCode)

            toast.success('Пароль успешно скопирован', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}>
            <i className="fa-solid fa-clone"></i>
          </div>

        </div>
        <div className="mt-2 row row_col row_center">
          <div className="col-1@xs btn active" onClick={() => {
            navigate('/')
          }}>Сохранил
          </div>
        </div>
      </>
  )

  return (
      <section className="canvas login">
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>
            <div>

              <Links active='registration'/>

              <h3 className="bolder mt-6">Добро пожаловать!</h3>
              <p className="small bold text-grey">Создайте аккаунт для продолжения</p>

              {recoveryCode ? <RecoveryCodeHtml/> : (
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
                              <ErrorMessage className="text-grey" name="username" component="small"/>
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
                              <ErrorMessage className="text-grey" name="password" component="small"/>
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
                              <ErrorMessage className="text-grey" name="confirmPassword" component="small"/>
                            </div>

                            <div className="accept-rules mt-2">
                              <label className="checkbox row">
                                <Field type="checkbox" name="termsAndConditions"/>
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
              )}
            </div>
          </div>
        </div>
      </section>
  )
}

export default Registration
