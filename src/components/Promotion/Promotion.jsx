import React, {useEffect, useState} from 'react';
import CountDown from "./CountDown.jsx";
import {getPromotionTariff} from "../../api/manager.js";


const Promotion = () => {
  const [timestamp, setTimestamp] = useState()

  useEffect(() => {
    getPromotionTariff().then(({data}) => {
      setTimestamp(data?.remaining_time)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
      <div className="promotion">
        <div className="row row_col">
          <h4 className="title bolder text-dark">Зарегистрируйтесь и пользуйтесь тарифом Бизнес бесплатно. Время ограничено!</h4>
          {timestamp && <CountDown seconds={timestamp} />}
        </div>
        <ul>
          <li>Хранение данных "Без срока"</li>
          <li> Доступны альбомы</li>
          <li> Загрузка до 50 фото в один альбом</li>
          <li> Общая память хранения до 1тб, больше - пока через поддержку</li>
          <li> Добавляется функция одноразовой ссылки</li>
          <li> Возможность редактировать альбомы</li>
        </ul>
        <div className="row row_end mt-1">
          <div className="row row_center">
            <p className="text-dark link line small ml-2">Получить </p>
            <i className="text-orange fa-duotone fa-gift ml-1"></i>
          </div>
        </div>
      </div>
  )
};

export default Promotion;