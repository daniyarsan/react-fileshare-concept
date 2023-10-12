import React from 'react'
import {Pricing} from "../../components/Pricing/Pricing.jsx";
import Faq from "../../components/Faq/Faq.jsx";


function PricingPage() {

  return (
      <div className='canvas'>
        <div className='container'>
          <Pricing />
          <hr/>
          <Faq />
        </div>
      </div>
  )
}

export default PricingPage
