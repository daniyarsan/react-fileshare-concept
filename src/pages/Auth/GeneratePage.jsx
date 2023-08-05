import React, {useState} from 'react'
import {Preloader} from "../../components/Preloader/index.js";
import {Link} from "react-router-dom";
import {object, string} from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {recoverToken} from "../../api/manager.js";
import {toast} from "react-toastify";

function GeneratePage(props) {
  const [loading, setLoading] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    password: ''
  }
  const validation = object({
    password: string().required('Обязательное поле')
  })

  const onSubmit = (data, formikHelpers) => {
    setLoading(true)

    recoverToken({password: data.password}).then(({data}) => {
      setLoading(false)
      setRecoveryCode(data?.code)
    }).catch(({response}) => {
      setLoading(false)
      toast.error(response.data?.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
    })

    formikHelpers.resetForm()
  }


  const SuccessView = () => {
    return (
        <div>
          <div className="row row_center row_sb mt-6">
            <h3 className="bolder">Ваш резервный код</h3>
          </div>
          <p className="mt-1"><span className="text-orange">Резервный код - это единственный путь восстановить доступ к аккаунту</span>, в случае если Вы забыли или потеряли данные
            для входа. Администраторам и пользователям следует хранить резервный код в безопасном месте.</p>
          <div className="mt-2 row row_center">
            <div>
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
            <Link to='/' className="col-1@xs btn active">Сохранил</Link>
          </div>
        </div>
    )
  }


  return (
      <>
        {loading && <Preloader/>}

        <section className='canvas'>
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              {recoveryCode ? <SuccessView/> : (
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
              )}
            </div>
          </div>

        </section>
      </>
  )
}

export default GeneratePage
