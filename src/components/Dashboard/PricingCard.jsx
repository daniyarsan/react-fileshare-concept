import React from 'react'
import {formatBytes} from "../../service/helper.js";

export const PricingCard = ({title, description, price, size, shelf_time, files}) => {
  return (
      <div className="pdd-md">
        <div className="card">
          <div className="row row_sb">
            <p className="bold text-dark">{title}</p>
            <p className="bold text-orange">Активный</p>
          </div>
          <div className="list mt-1">
            <p>Время хранения файлов {shelf_time}</p>
            <p>Стоимость - {Math.floor(price)}$</p>
            <p>Доступно {formatBytes(size * 1048576)} ГБ</p>
          </div>
          <hr/>
          <div className='description'>
            {description}
          </div>
        </div>
      </div>
  )
}