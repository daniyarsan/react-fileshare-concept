import React, {useEffect, useState} from 'react'
import {getPricing} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {PricingBlock} from "../../components/Pricing/PricingBlock.jsx";
import Faq from "../../components/Pricing/Faq.jsx";

function PricingPage() {
  const [loading, setLoading] = useState(true)
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])

  useEffect(() => {
    getPricing().then(resp => {
      const {month_pricing_options, year_pricing_options} = resp?.data
      setMonthlyPlans(month_pricing_options)
      setYearlyPlans(year_pricing_options)
      setLoading(false)
    })
  }, [])

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

        <div className='canvas bgPeach'>
          <PricingBlock {...{monthlyPlans, yearlyPlans}} />
          <hr/>
          <Faq data={faq} />
        </div>
      </>
  )
}

export default PricingPage
