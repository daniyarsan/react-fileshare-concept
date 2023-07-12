import React from 'react'
import Links from "./_parts/Links.jsx";


function Forgot(props) {

  return (
      <section className="login">
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>
            <div>

              <Links />

              <h3 className="bolder mt-6">Восстановление доступа</h3>
              <p className="small bold text-grey">Введите Ваши данные для восстановления доступа</p>

              <div className="form mt-2">
                <div className="relative">
                  <div className="bold small">Резервный код</div>
                  <input className="col-1@xs" type="text"/>
                  <small className="text-grey">Минимум 6 символов</small>
                </div>

                <div className="password">
                  <div className="bold small mt-1">Новый пароль</div>
                  <div className="relative">
                    <input className="input-password col-1@xs" type="password"/>
                    <div className="input-icon">
                      <i className="eye fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                  <div className="row row_sb">
                    <small className="text-grey">Минимум 6 символов, 1 заглавная</small>
                  </div>
                </div>

                <div className="password">
                  <div className="bold small mt-1">Подтвердите пароль</div>
                  <div className="relative" onClick="togglePassword(this, event)">
                    <input className="input-password col-1@xs" type="password"/>
                    <div className="input-icon">
                      <i className="eye fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                  <div className="row row_sb">
                    <small className="text-grey">Минимум 6 символов, 1 заглавная</small>
                  </div>
                </div>

                <div className="col-1@xs btn mt-2">Сохранить</div>
                <div className="row row_col row_center mt-1">
                  <p className="small link text-grey line">Отмена</p>
                </div>

              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
  )
}

export default Forgot
