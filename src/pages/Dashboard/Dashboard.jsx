import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Dashboard() {
  const {userData} = useSelector(state => state.user)



  return (
      <section>
        <div className="container">
          <div className="mt-3 flex row-1@xs row-1-3@m">
            <div></div>
            <div className="pdd-md">
              <div className="row row_sb row_center">
                <h1 className="bolder center">Личные данные</h1>
              </div>
              <div className="mt-2">
                <div className="bold small">Логин</div>
                <div className="input">{userData.username}</div>
                <div className="row row_end">
                  <Link to='/reset' className="small text-dark link line">Сменить пароль</Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="mt-2">
            <h1 className="bolder center">Мои тарифы</h1>

            <div className="cards lk flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">
              <div className="pdd-md">
                <div className="card">
                  <div className="row row_sb">
                    <p className="bold text-dark">Бесплатный</p>
                    <p className="bold text-orange"></p>
                  </div>
                  <div className="list mt-1">
                    <p>Доступно 43/50 МБ</p>
                    <p>Срок хранения файлов 30 дней</p>
                    <p>Отчет просмотра файлов</p>
                  </div>
                </div>
              </div>
              <div className="pdd-md hidden">
                <div className="card">
                  <div className="row row_sb text-grey">
                    <p className="bold text-dark">Корпоративный</p>
                    <p className="bold">Скоро</p>
                  </div>
                  <div className="list mt-1 text-grey">
                    <p>Дата списания 23.03.2023</p>
                    <p>Стоимость - 87$</p>
                    <p>Доступно 50/50 ГБ</p>
                    <p>5 аккаутнов для сотрудников</p>
                    <p>Создание альбомов</p>
                    <p>Срок хранения файлов до 12 месяцев</p>
                    <p>Отчет просмотра файлов</p>
                  </div>
                </div>
              </div>
              <div className="pdd-md">
                <div className="card">
                  <div className="row row_sb">
                    <p className="bold text-dark">Бизнес</p>
                    <p className="bold text-orange">Активный</p>
                  </div>
                  <div className="list mt-1">
                    <p>Дата списания 23.03.2023</p>
                    <p>Стоимость - Бесплатно до конца акции</p>
                    <p>Доступно 50/50 ГБ</p>
                    <p>Создание альбомов</p>
                    <p>Срок хранения файлов до 12 месяцев</p>
                    <p>Отчет просмотра файлов</p>
                  </div>
                </div>
              </div>

            </div>
            <div className="row row-1@xs row-1-3@m pdd-md-wrapper">
              <div></div>
              <div className="pdd-md">
                <div className="btn col-1@xs active" >Купить больше места</div>
              </div>
              <div></div>
            </div>
          </div>

        </div>
      </section>
  )
}

export default Dashboard
