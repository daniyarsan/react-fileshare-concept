import React from 'react'
import {Link} from "react-router-dom";
import Links from "./_parts/Links.jsx";

function Registration(props) {

  return (
      <>
        <section className="login">
          <div className="container">
            <div className="flex row-1@xs row-1-3@m">
              <div></div>
              <div>

                <Links active='registration' />

                <h3 className="bolder mt-6">Добро пожаловать!</h3>
                <p className="small bold text-grey">Создайте аккаунт для продолжения</p>

                <div className="form mt-2">
                  <div>
                    <div className="bold small">Логин</div>
                    <div className="custom-alert-wrapper relative">
                      <div className="custom-alert">
                        <div className="body row">
                          <div>
                            <p className="bolder">Логин занят</p>
                          </div>
                          <div className="img-contain ml-1">
                            <img src="" alt=""/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input className="col-1@xs" type="text"/>
                    <small className="text-grey">Минимум 6 символов</small>
                  </div>

                  <div className="password mt-1">
                    <div className="bold small">Пароль</div>
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

                  <div className="password mt-1">
                    <div className="bold small mt-1">Подтвердите пароль</div>
                    <div className="custom-alert-wrapper relative">
                      <div className="custom-alert">
                        <div className="body row">
                          <div>
                            <p className="bolder">Ошибка! Пароли не совпадают</p>
                          </div>
                          <div className="img-contain ml-1">
                            <img src="" alt=""/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input className="input-password col-1@xs" type="password"/>
                      <div className="input-icon">
                        <i className="eye fa-solid fa-eye-slash"></i>
                      </div>
                    </div>
                  </div>
                  <div className="accept-rules mt-2">
                    <label className="checkbox row">
                      <input type="checkbox" name="checkbox-checked" checked/>
                      <p className="small ml-1">Я принимаю
                        <a href="" className="link line">Условия обслуживания Softbox</a>. Из нашей
                        <a href="" className="link line">Политики конфеденциальности</a> Вы узнаете о том, как мы используем и защищаем Ваши данные.
                      </p>
                    </label>
                  </div>

                  <div className="col-1@xs btn mt-2" id="btn-set-pass active">Далее</div>
                  <div className="row row_col row_center">
                    <p className="small text-grey center mt-1">Уже есть аккаунт?
                      <a href="" className="link line text-dark ml-1">Войти</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </>
  )
}

export default Registration
