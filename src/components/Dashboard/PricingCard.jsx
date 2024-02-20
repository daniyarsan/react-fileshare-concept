import React from 'react'
import {formatBytes} from "../../service/utility.js";
import {hoursToDays} from "../../service/TimeConverter.js";
import TextToList from "../UI/TextToList/TextToList.jsx";

export const PricingCard = ({title, description, price, size, shelf_time}) => {
  return (
      <div className="pdd-md">
        <div className="card">
          <div className="row row_sb">
            <p className="bold text-dark">{title}</p>
            <p className="bold text-orange">Активный</p>
          </div>
          <div className="list mt-1">
            <p>Время хранения файлов {hoursToDays(shelf_time)}</p>
            <p>Стоимость - {Math.floor(price)}$</p>
            <p>Доступно {formatBytes(size * 1048576)}</p>
          </div>
          <hr/>
          <div className='description'>
            <TextToList text={description} />
          </div>
        </div>
      </div>
  )
}