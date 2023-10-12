import React, {useContext, useEffect, useState} from 'react'
import {formatBytes} from "../../service/utility.js";
import {hoursToDays} from "../../service/TimeConverter.js";
import TextToList from "../UI/TextToList/TextToList.jsx";
import {getPricing, getTariff} from "../../api/manager.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import {TARIFF_ACTIVATE, TARIFF_PRICING} from "../../api/const.js";
import {RequestContext} from "../../contexts/RequestProvider.jsx";
import requester from "../../api/axios.js";

export const Pricing = (props) => {
  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext);
  const {requester} = useContext(RequestContext);

  const [isMonthly, setIsMonthly] = useState(true)
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])


  useEffect(() => {
    requester.get(`${TARIFF_PRICING}`).then(({data}) => {
      const {month_pricing_options, year_pricing_options} = data
      setMonthlyPlans([month_pricing_options[0], month_pricing_options[2], month_pricing_options[1]])
      setYearlyPlans([year_pricing_options[0], year_pricing_options[2], year_pricing_options[1]])
      // setLoading(false)
    })

  }, [])


  const handlePurchase = (option, yearlyDiscount) => {
    // setLoading(true)

    if (!currentUser.isAuthorized) {
      navigate('/login')
      return
    }

    requester.post(`${TARIFF_ACTIVATE}`, {option, yearlyDiscount}).then(({data}) => {
      // setLoading(false)
      window.location.replace(data.url)
    }).catch(({resp}) => {
      // setLoading(false)
      toast.error(resp?.data?.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
    })
  }


  const PricingCard = ({title, description, size, price, shelf_time, option}) => {

    return (
        <div className="pdd-md">

          <div className={`card pdd-lg ${currentUser.hasTariff(option) && 'active'}`}>

            <div className="row row_sb">
              <p className="bold text-dark">{title}</p>
              <p className="bold"></p>
            </div>
            <h1>{formatBytes(size * 1048576)}</h1>

            <div className="list">
              <p>Стоимость {Math.floor(price)}$</p>
              <p>Загрузка файла до {formatBytes(size * 1048576)}</p>
              <p>{shelf_time > 0 && 'Срок хранения до '}{hoursToDays(shelf_time)}</p>
              <hr/>
              <div><TextToList text={description}/></div>
            </div>

            {
              currentUser.hasTariff(option)
                  ? (<button className='btn btn-submit row row_col row_center col-1@xs mt-2' disabled='disabled'>Подключено</button>)
                  : (<button className="btn btn-submit row row_col row_center col-1@xs mt-2" onClick={() => {
                        handlePurchase(option, !isMonthly)
                      }}><p>Подключить за {Math.floor(price)} $/мес</p> {!isMonthly && (<p className="thin small">При оплате за год</p>)}
                      </button>
                  )
            }
          </div>
        </div>
    )
  }


  return (
      <div className="pricingPage">
        <h1 className="bolder center">Тарифы</h1>

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
              <i className="fa-solid fa-people-group mr-1"></i> Корпоративный (скоро)
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
