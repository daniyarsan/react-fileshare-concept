import React from 'react'
import {Link} from "react-router-dom";
import {PricingCard} from "./PricingCard.jsx";

export const Dashboard = ({userData}) => {

  return (
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

        <hr/>

        <div className="mt-2">
          <h1 className="bolder center">Мой тариф</h1>

          <div className="cards lk flex row-1@xs row-1-3@m pdd-md-wrapper">
            <div></div>
            <PricingCard {...userData?.tariff} />
            <div></div>
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
              <Link to='/plans' className="btn col-1@xs active">Купить больше места</Link>
            </div>
            <div></div>
          </div>
        </div>

      </div>

  )
}

