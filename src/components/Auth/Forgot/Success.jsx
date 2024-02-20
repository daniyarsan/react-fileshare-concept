import React from 'react';
import Clipboard from "react-clipboard.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Success = ({recoveryCode}) => {
  const navigate = useNavigate()

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

export default Success;