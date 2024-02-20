import React from 'react'
import {Link} from "react-router-dom";

function NotFound() {
  return (
      <div className="row row_col row_center row_sb h100">
        <div></div>
        <div className="flex col-1@xs row-1@xs row-1-3@m">
          <div></div>

          <div style={{marginTop: '20vh'}}>
            <div className="custom-alert-wrapper relative">
              <div className="custom-alert">
                <div className="body row row_center">
                  <div>
                    <p className="bolder small">Мы не можем найти нужную Вам страницу</p>
                  </div>
                  <div className="img-contain ml-1">
                  </div>
                </div>
              </div>
            </div>
            <h1 className="bolder center" style={{fontSize: '50px'}}>ОШИБКА 404</h1>
            <div className="row row_col row_center">
              <Link to='/' className="btn mt-2 active">Перейти на главную</Link>
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
  )
}

export default NotFound
