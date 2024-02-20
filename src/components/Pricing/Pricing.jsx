import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import {TARIFF_PRICING} from "../../api/const.js";
import {RequestContext} from "../../contexts/RequestProvider.jsx";
import PricingCard from "./PricingCard.jsx";

export const Pricing = (props) => {
  const {requester} = useContext(RequestContext);
  const {setLoader} = useContext(AuthContext);

  const [isMonthly, setIsMonthly] = useState(true)
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])


  useEffect(() => {
    setLoader(true)

    const onPageLoad = () => {
      requester.get(`${TARIFF_PRICING}`).then(({data}) => {
        const {month_pricing_options, year_pricing_options} = data
        setMonthlyPlans([month_pricing_options[0], month_pricing_options[2], month_pricing_options[1]])
        setYearlyPlans([year_pricing_options[0], year_pricing_options[2], year_pricing_options[1]])
      }).catch(err => {
        // console.log(err)
      }).finally(() => {
        setLoader(false)
      })
    }

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }


  }, [])


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

            <p className={`year ml-1 ${isMonthly ? '' : 'choosen'}`}>На 1 год</p>
          </div>
        </div>

        <div className="cards flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">

          {
            (isMonthly ? monthlyPlans : yearlyPlans).map(item => {
              return <PricingCard key={item.option} isMonthly={isMonthly} {...item} />
            })
          }

        </div>
      </div>
  )
}
