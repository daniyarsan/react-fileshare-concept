import React from 'react';
import Clipboard from "react-clipboard.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const Success = ({recoveryCode}) => {

  return (
      <div>
        <div className="row row_center row_sb mt-6">
          <h3 className="bolder">Ваш резервный код</h3>
        </div>
        <p className="mt-1"><span className="text-orange">Резервный код - это единственный путь восстановить доступ к аккаунту</span>, в случае если Вы забыли или потеряли данные
          для входа. Администраторам и пользователям следует хранить резервный код в безопасном месте.</p>

        <Clipboard className="mt-2 row row_center" component='a' data-clipboard-text={recoveryCode} onSuccess={() => {
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
          <Link to='/' className="col-1@xs btn active">Сохранил</Link>
        </div>
      </div>
  )
}

export default Success;