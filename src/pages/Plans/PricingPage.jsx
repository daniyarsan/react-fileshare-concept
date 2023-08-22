import React, {useEffect, useState} from 'react'
import {getPricing, getTariff} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {PricingBlock} from "../../components/Pricing/PricingBlock.jsx";
import Faq from "../../components/Pricing/Faq.jsx";
import {toast} from "react-toastify";
import {PlanSuccess} from "../../components/Pricing/PlanSuccess.jsx";

function PricingPage() {
  const [loading, setLoading] = useState(true)
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])
  const [purchaseSuccessData, setPurchaseSuccessData] = useState(false)

  useEffect(() => {
    getPricing().then(resp => {
      const {month_pricing_options, year_pricing_options} = resp?.data
      setMonthlyPlans(month_pricing_options)
      setYearlyPlans(year_pricing_options)
      setLoading(false)
    })
  }, [])

  const handlePurchase = (option, yearlyDiscount) => {
    setLoading(true)
    getTariff(option, yearlyDiscount).then(({data}) => {
      setLoading(false)
      setPurchaseSuccessData(data)
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
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id dicta, quae recusandae magnam optio'
    },
    {
      question: 'Как отключить подписку?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id dicta, quae recusandae magnam optio'
    },
    {
      question: 'Что будет, если я перестану платить подписку?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id dicta, quae recusandae magnam optio'
    }
  ]

  return (
      <>
        {loading && <Preloader/>}

        <div className='canvas'>
          <div className='container'>
            {purchaseSuccessData ? <PlanSuccess {...purchaseSuccessData} /> : <PricingBlock {...{monthlyPlans, yearlyPlans, setLoading, handlePurchase}} />}
          </div>
          <hr/>
          {!purchaseSuccessData && <Faq data={faq}/>}
        </div>
      </>
  )
}

export default PricingPage
