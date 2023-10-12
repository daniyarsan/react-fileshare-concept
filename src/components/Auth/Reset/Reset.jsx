import React, {useContext, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {object, ref, string} from "yup";
import {RESET_PASSWORD, VALIDATION_MIN_PASSWORD_LENGTH} from "../../../api/const.js";
import {toast} from "react-toastify";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";

const Reset = () => {
  const { currentUser } = useContext(AuthContext);
  const {requester} = useContext(RequestContext);

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    password: '',
    new_password: '',
    confirmPassword: ''
  }

  const validation = object({
    password: string().required('Обязательное поле'),
    new_password: string()
        .required('Обязательное поле').required('Обязательное поле')
        .min(VALIDATION_MIN_PASSWORD_LENGTH, `Не менее ${VALIDATION_MIN_PASSWORD_LENGTH} символов`)
        .matches(/[0-9]/, 'Должен содержать цифру')
        .matches(/[a-z]/, 'Должен содержать прописную букву')
        .matches(/[A-Z]/, 'Должен содержать заглавную букву')
        .matches(/[^\w]/, 'Должен содержать символ'),
    confirmPassword: string().required('Обязательное поле').oneOf([ref('new_password'), null], 'Пароли должны совпадать')
  })

  const onSubmit = (data, formikHelpers) => {
    // setLoading(true)

    requester.post(`${RESET_PASSWORD}`, {new_password: data.new_password, old_password: data.password}).then(({data}) => {
      // setLoading(false)
      console.log(data)

      toast.success('Пароль сохранен успешно', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

      navigate('/')
    })


    formikHelpers.resetForm()
  }


  return (
      <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}>
        {({errors, isValid, handleSubmit, touched, dirty}) => (
            <Form onSubmit={handleSubmit}>

              <div className="form mt-2">
                <div className="name">
                  <div className="bold small">Логин</div>
                  <div className="input">{currentUser.username}</div>
                </div>

                <div className="password mt-2">
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

                <div className="password">
                  <div className="bold small mt-1">Новый пароль</div>
                  <div className="relative">
                    <Field className='input-password col-1@xs' type={showPassword ? 'text' : 'password'} name="new_password"/>
                    <a onClick={() => {
                      setShowPassword(!showPassword)
                    }} className="input-icon">
                      <i className={`eye fa-solid fa-eye${!showPassword ? '-slash' : ''}`}></i>
                    </a>
                  </div>
                  <ErrorMessage className="text-danger" name="new_password" component="small"/>
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
                  <ErrorMessage className="text-danger" name="confirmPassword" component="small"/>
                </div>

                <button type="submit" className={`col-1@xs btn mt-2 ${(isValid && dirty) && 'active'}`}>Сохранить</button>

                <div className="row row_col row_center mt-1">
                  <p className="small link text-danger line" onClick={() => {
                    navigate('/')
                  }}>Отмена</p>
                </div>
              </div>
            </Form>
        )}
      </Formik>
  );
};

export default Reset;