import React from 'react'
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

function DashboardPage() {
  const {userData} = useSelector(state => state.user)

  const PricingCard = ({title, description, price, size, expiration_date }) => {
    return (
        <div className="pdd-md">
          <div className="card">
            <div className="row row_sb">
              <p className="bold text-dark">{title}</p>
              <p className="bold text-orange">Активный</p>
            </div>
            <div className="list mt-1">
              <p>Дата списания {expiration_date}</p>
              <p>Стоимость - {price}</p>
              <p>Доступно {size} ГБ</p>
              {description}
              <p>Создание альбомов</p>
              <p>Срок хранения файлов до 12 месяцев</p>
              <p>Отчет просмотра файлов</p>
            </div>
          </div>
        </div>
    )
  }

  return (
      <section className='canvas'>
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
                <br/>
                <div className="row row_end">
                  <Link to='/generate' className="small text-dark link line">Новый код восстановления</Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="mt-2">
            <h1 className="bolder center">Мои тарифы</h1>

            <div className="cards lk flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">

              <PricingCard {...userData.tariff} />

            </div>
            <div className="row row-1@xs row-1-3@m pdd-md-wrapper">
              <div></div>
              <div className="pdd-md">
                <Link className="btn col-1@xs main" to='/album/create'>Создать альбом</Link>
              </div>
              <div></div>
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

export default DashboardPage
