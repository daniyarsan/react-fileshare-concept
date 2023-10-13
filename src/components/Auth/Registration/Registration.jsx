import React, {useContext, useState} from 'react';
import RegistrationSuccess from "./RegistrationSuccess.jsx";
import {RegistrationForm} from "./RegistrationForm.jsx";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {REGISTER} from "../../../api/const.js";
import {toast} from "react-toastify";
import store from "../../../store/store.js";

const Registration = () => {
  const {requester} = useContext(RequestContext);
  const [loader, setLoader] = store.useState("loader");

  const [recoveryCode, setRecoveryCode] = useState(null)


  const onSubmit = (data, formikHelpers) => {
    setLoader(true)
    requester.post(REGISTER, JSON.stringify({username: data.username, password: data.password})).then(({data}) => {
      setRecoveryCode(data?.code)

      toast.success('Пользователь создан успешно', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

    }).finally(() => {
      setLoader(false)

    })
  }
  
  return recoveryCode ? <RegistrationSuccess {...{recoveryCode}} /> : <RegistrationForm {...{onSubmit, recoveryCode}} />

}

export default Registration;