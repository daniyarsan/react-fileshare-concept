import React from 'react'
import Clipboard from "react-clipboard.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export const PlanSuccess = ({id, url}) => {

  return (
      <div className="flex row-1@xs row-1-3@m">
        <div></div>
        <div>
          <div className="row row_center row_sb mt-6">
            <h3 className="bolder">Чтобы оплатить тариф...</h3>
          </div>
          <p className="mt-1"><span className="text-orange">Пожалуйста пройдите по данному URL</span>,
            и завершите оплату.</p>


          <Clipboard className="mt-2 row row_center" component='a' data-clipboard-text={url} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}>
            <div>
              <div id="shareLink" className="bold text-overflow">{url}</div>
            </div>
            <div className="link bold ml-1">
              <i className="fa-solid fa-clone"></i>
            </div>
          </Clipboard>

          <div className="mt-2 row row_col row_center">
            <Link to={url} className="col-1@xs btn active">Перейти</Link>
          </div>
        </div>
        <div></div>
      </div>

  )
}
