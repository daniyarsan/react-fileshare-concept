import React from 'react'
import Registration from "../../components/Auth/Registration/Registration.jsx";

function TermsPage(props) {

  return (
      <div className="policyPage">
        <h1 className="bolder center">Пользовательское соглашение</h1>

        <div className="container">
          <div className="bs-callout bs-callout">
            <ul>
              <li className='mt-2'>Megapics.pm именуемый «Веб-сайт», предназначен для обмена и хранения изображений.</li>
              <li className='mt-2'>Настоящее Пользовательское соглашение вступает в силу с момента начала использования Веб-сайта.</li>
              <li className='mt-2'>При использовании Веб-сайта запрещается размещать:</li>
              <li className='mt-2'>Материалы, которые являются незаконными в Российской Федерации.</li>
              <li className='mt-2'>Интеллектуальная собственность, копирование которой запрещено первоначальными владельцами.</li>
              <li className='mt-2'>Вредоносное ПО.</li>
              <li className='mt-2'>Материалы, нарушающие раздел 3 настоящего соглашения, будут удалены с Веб-сайта при их обнаружении.</li>
              <li className='mt-2'>Администрация Веб-сайта ни при каких обстоятельствах не несет ответственности за контент, загруженный и отправленный Пользователем через Веб-сайт.</li>
              <li className='mt-2'>Ни при каких обстоятельствах Администрация Веб-сайта не несет ответственности за всевозможные упущенные выгоды или за любые убытки по любым причинам.</li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default TermsPage
