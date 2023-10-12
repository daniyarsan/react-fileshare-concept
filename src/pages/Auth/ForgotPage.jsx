import React, {useState} from 'react'
import Links from "./_parts/Links.jsx";
import {object, ref, string} from "yup";
import {VALIDATION_MIN_PASSWORD_LENGTH} from "../../api/const.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {recoverPasswordByToken} from "../../api/manager.js";
import {toast} from "react-toastify";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {useNavigate} from "react-router-dom";
import Clipboard from 'react-clipboard.js';


function ForgotPage(props) {
  const [loading, setLoading] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  // const userData = useSelector(state => state.user)
  const navigate = useNavigate()

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
    setLoading(true)
    recoverPasswordByToken({username: userData.username, new_password: data.password, code: data.reserveCode}).then((resp) => {
      setLoading(false)
      if (resp.status < 200 || resp.status >= 300) {
        toast.error(resp.data?.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
        return
      }
      setRecoveryCode(resp?.data?.code)
    })
    // formikHelpers.resetForm()
  }


  const SuccessView = () => {
    return (
        <div>
          <div className="row row_center row_sb mt-6">
            <h3 className="bolder">Пароль успешно создан</h3>
          </div>
          <p className="mt-1">
            <span className="text-orange">Код восстановления был сброшен. Пожалуйста сохраните новый токен. </span>
            Пожалуйста сохраните новый код и храните его в безопасном месте. В случае если Вы забыли или потеряли данные для входа - свяжитесь с поддержкой.
          </p>

          <Clipboard className="row row_center mt-2" component='a' data-clipboard-text={recoveryCode} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}>

            <div id="shareLink" className="bold text-overflow">{recoveryCode}</div>
            <div className="link bold ml-1">
              <i className="fa-solid fa-clone"></i>
            </div>

          </Clipboard>

          <div className="mt-2 row row_col row_center">
            <div className="col-1@xs btn active" onClick={() => {
              navigate('/')
            }}>Сохранил
            </div>
          </div>
        </div>
    )
  }

  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              <div>

                <Links/>

                {recoveryCode ?
                    <SuccessView/> :
                    (
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
                    )}

              </div>
              <div></div>
            </div>
          </div>
        </section>
      </>
  )
}

export default ForgotPage
