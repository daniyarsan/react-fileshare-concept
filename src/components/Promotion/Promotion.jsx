import React, {useContext, useEffect, useState} from 'react';
import CountDown from "./CountDown.jsx";
import {TARIFF_OFFER, TARIFF_PRICING} from "../../api/const.js";
import {RequestContext} from "../../contexts/RequestProvider.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import TextToList from "../UI/TextToList/TextToList.jsx";


const Promotion = () => {
  const [timestamp, setTimestamp] = useState()
  const [businessTariff, setBusinessTariff] = useState()
  const {requester} = useContext(RequestContext)
  const {setLoader} = useContext(AuthContext);

  useEffect(() => {
    setLoader(true)

    requester.get(`${TARIFF_OFFER}`).then(({data}) => {
      setTimestamp(data?.remaining_time)
    }).catch(err => {
      // console.log(err)
    }).finally(() => {
      setLoader(false)
    })

    requester.get(`${TARIFF_PRICING}`).then(({data}) => {
      setBusinessTariff(data.month_pricing_options[2])
    }).catch(err => {
      // console.log(err)
    }).finally(() => {
      setLoader(false)
    })
  }, [])


  return (
      <div className="promotion">
        <div className="row row_col">
          <h4 className="title bolder text-dark">Зарегистрируйтесь и пользуйтесь тарифом Бизнес бесплатно. Время ограничено!</h4>
          {timestamp && <CountDown seconds={timestamp}/>}
        </div>
        <div>{businessTariff?.description && <TextToList text={businessTariff?.description}/>}</div>
        <div className="row row_end mt-1">
          <div className="row row_center">
            <Link to='/registration' className="text-dark link line small ml-2">Получить </Link>
            <i className="text-orange fa-duotone fa-gift ml-1"></i>
          </div>
        </div>
      </div>
  )
};

export default Promotion;