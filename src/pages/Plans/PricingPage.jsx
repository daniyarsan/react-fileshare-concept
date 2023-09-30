import React, {useEffect, useState} from 'react'
import {getPricing, getTariff} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {Pricing} from "../../components/Pricing/Pricing.jsx";
import Faq from "../../components/Pricing/Faq.jsx";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {AUTH_TOKEN} from "../../api/const.js";
import {useNavigate} from "react-router-dom";


function PricingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])
  
  const {isAuth, userData} = useSelector(state => state.user)
  const isAuthorized = isAuth && localStorage.getItem(AUTH_TOKEN)

  useEffect(() => {
    getPricing().then(resp => {
      const {month_pricing_options, year_pricing_options} = resp?.data
      setMonthlyPlans([month_pricing_options[0], month_pricing_options[2], month_pricing_options[1]])
      setYearlyPlans([year_pricing_options[0], year_pricing_options[2], year_pricing_options[1]])

      setLoading(false)
    })
  }, [])

  const handlePurchase = (option, yearlyDiscount) => {
   if (!isAuthorized) {
     navigate('/login')
     return
   }

    setLoading(true)
    getTariff(option, yearlyDiscount).then(({data}) => {
      setLoading(false)
      window.location.replace(data.url)
    }).catch(({response}) => {
      setLoading(false)
      toast.error(response?.data?.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
    })
  }

  const faq = [
    {
      question: 'Как оплатить подписку?',
      answer: 'Оплатить подписку возможно цифровыми валютами: BTC, USDT. Выберите на месяц или год, затем нажмите "подключить" на подходящем тарифе.'
    },
    {
      question: 'Как отключить подписку?',
      answer: 'Не оплачивайте.'
    },
    {
      question: 'Что произойдет, когда отключается подписка?',
      answer: 'С момента окончания подписки, аккаунт замораживается. В течении следующих 30 календарных дней, созданные Альбомы останутся активны. По истечении 30 дней автоматически активируется бесплатный тариф. Все Альбомы, превышающие лимит хранения бесплатного тарифа, будут безвозвратно удалены в порядке их загрузки.'
    }
  ]

  return (
      <>
        {loading && <Preloader/>}

        <div className='canvas'>
          <div className='container'>
            <Pricing {...{monthlyPlans, yearlyPlans, setLoading, userData, handlePurchase}} />
            <hr/>
            <Faq data={faq}/>
          </div>
        </div>
      </>
  )
}

export default PricingPage
