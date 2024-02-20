import React, {useContext} from 'react';
import {formatBytes} from "../../service/utility.js";
import {getNoun} from "../../service/TimeConverter.js";
import TextToList from "../UI/TextToList/TextToList.jsx";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import {TARIFF_ACTIVATE} from "../../api/const.js";
import {useNavigate} from "react-router-dom";
import {RequestContext} from "../../contexts/RequestProvider.jsx";

const PricingCard = ({title, description, size, price, shelf_time, option, isMonthly}) => {
  const navigate = useNavigate()
  const { setLoader } = useContext(AuthContext);
  const {currentUser} = useContext(AuthContext);
  const {requester} = useContext(RequestContext);


  const handlePurchase = (option, yearlyDiscount) => {
    setLoader(true)

    if (!currentUser) {
      setLoader(false)
      navigate('/login')
      return
    }

    requester.post(`${TARIFF_ACTIVATE}`, {option, use_year_discount: yearlyDiscount}).then(({data}) => {
      window.location.replace(data.url)
    }).finally(() => {
      setLoader(false)
    })
  }


  return (
      <div className="pdd-md">

        <div className={`card pdd-lg ${currentUser && currentUser.hasTariff(option) && 'active'}`}>

          <div className="row row_sb">
            <p className="bold text-dark">{title}</p>
            <p className="bold"></p>
          </div>
          <h1>{formatBytes(size * 1048576)}</h1>

          <div className="list">
            <p>Стоимость {Math.floor(price)}$</p>
            <p>Загрузка файла до {formatBytes(size * 1048576)}</p>
            <p>{shelf_time > 0 && 'Срок хранения до '} {Math.floor(shelf_time / 24) < 0 ? 'Бессрочно' : `${Math.floor(shelf_time / 24)} ${getNoun(Math.floor(shelf_time / 24), 'день', 'дня', 'дней')}` }</p>
            <hr/>
            <div><TextToList text={description}/></div>
          </div>

          {
            currentUser && currentUser.hasTariff(option)
                ? (<button className='btn btn-submit row row_col row_center col-1@xs mt-2' disabled='disabled'>Подключено</button>)
                : (<button className="btn btn-submit row row_col row_center col-1@xs mt-2" onClick={() => {
                      handlePurchase(option, !isMonthly)
                    }}><p>Подключить за {Math.floor(price)} $/мес</p>
                    </button>
                )
          }
        </div>
      </div>
  )
}

export default PricingCard;