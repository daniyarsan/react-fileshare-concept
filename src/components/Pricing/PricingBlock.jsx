import React, {useState} from 'react'
import {formatBytes} from "../../service/helper.js";

export const PricingBlock = ({monthlyPlans, yearlyPlans}) => {
  const [isMonthly, setIsMonthly] = useState(true)

  /* COMPONENT */
  const PricingCard = ({title, description, size, price, shelf_time, files}) => {
    return (
        <div className="pdd-md">
          <div className="card pdd-lg">
            <div className="row row_sb">
              <p className="bold text-dark">{title}</p>
              <p className="bold"></p>
            </div>
            <h1>{formatBytes(size * 1048576)}</h1>
            <div className="list">
              <p>Стоимость {Math.floor(price)}$</p>
              <p>Загрузка файла до {formatBytes(size * 1048576)}</p>
              <p>Срок хранения файлов до {shelf_time} дней</p>
              <hr/>
              <p>{description}</p>
            </div>
            <div className="btn btn-dark row row_col row_center col-1@xs mt-2 active">
              <p>Подключить за {Math.floor(price)} р/мес</p>
              {!isMonthly && (<p className="thin small">При оплате за год + год бесплатно</p>)}
            </div>
          </div>
        </div>
    )
  }
  /* COMPONENT */

  return (
      <div className="container">
        <h1 className="bolder center">Выберите подходящий тариф</h1>
        <h3 className="thin center">Активируйте тариф Бизнес
          <span className="bolder relative">
            {/*<TimerAlert />*/
            }бесплатно до 1 сентября</span>
        </h3>

        <div className="flex row_center row-1@xs row-1-3@m mt-3">
          <div></div>
          <div className="toggleType row row_sb">
            <div className="btn mr-1 active"><i className="fa-solid fa-heart mr-1"></i> Личный</div>
            <div className="btn corporative relative">
              <div className="custom-alert-wrapper hidden">
                <div className="custom-alert">
                  <div className="body row">
                    <div>
                      <p className="bolder">Скоро</p>
                    </div>
                    <div className="img-contain ml-1">
                      <img src="" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <i className="fa-solid fa-people-group mr-1"></i> Корпоративный
            </div>
          </div>
          <div></div>
        </div>

        <div className="flex row_center row-1@xs mt-3">
          <div className="toggleDefault row row_center">
            <p className={`month ${isMonthly ? 'choosen' : ''}`}>На месяц</p>
            <div className="ml-1">
              <input type="checkbox" id="switch" onChange={() => {
                setIsMonthly(!isMonthly)
              }}/>
              <label htmlFor='switch'></label>
            </div>
            <p className={`year ml-1 ${isMonthly ? '' : 'choosen'}`}>На год</p>
          </div>
        </div>

        <div className="cards flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">
          {
            (isMonthly ? monthlyPlans : yearlyPlans).map(item => {
              return <PricingCard key={item.option} {...item} />
            })
          }
        </div>
      </div>
  )
}
