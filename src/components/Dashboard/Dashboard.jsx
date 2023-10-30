import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {PricingCard} from "./PricingCard.jsx";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import ProgressBar from "../UI/ProgressBar/ProgressBar.jsx";

export const Dashboard = () => {

  const { currentUser } = useContext(AuthContext);

  return (
      <>
        <div className="mt-3 flex row-1@xs row-1-3@m">
          <div></div>
          <div className="pdd-md">
            <div className="row row_sb row_center">
              <h1 className="bolder center">Хранилище использовано: </h1>
            </div>

            <div className="m-3">
              <div className="row row_center row_sb">
                <div className="col-1@xs col-1-3@m m-auto@m">
                  <ProgressBar value={(currentUser.files_size * 100) / currentUser.tariff.size}/>
                </div>
              </div>

            </div>

            <div className="row row_sb row_center">
              <h1 className="bolder center">Логин: {currentUser.username}</h1>
            </div>
            <div className="mt-2">
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
            <PricingCard {...currentUser?.tariff} />
            <div></div>
          </div>
          <div className="row row-1@xs">
            <div className="pdd-md">
              <Link to='/' className="btn col-1@xs col-1-3@m m-auto@m main">Создать альбом</Link>
            </div>
          </div>

          <div className="row row-1@xs">
            <div className="pdd-md">
              <Link to='/plans' className="btn col-1@xs col-1-3@m m-auto@m active">Купить больше места</Link>
            </div>
          </div>
        </div>
      </>
  )
}

