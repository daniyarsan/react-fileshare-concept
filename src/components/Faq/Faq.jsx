import React, {useState} from 'react'

export const Faq = (props) => {

  const data = [
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


  const FaqItem = ({question, answer}) => {
    const [show, setShow] = useState()
    return (
        <div className="mt-3">
          <div className="row row_sb row_center link" onClick={() => {
            setShow(!show)
          }}>
            <h3>{question}</h3>
            <div className="icon">
              {show ? (<i className="fa-duotone fa-arrow-up-to-line fa-lg"></i>) : (<i className="fa-duotone fa-arrow-down-to-line fa-lg"></i>)}
            </div>
          </div>
          <div className={`mt-1 ${show ? '' : 'hidden'}`}>
            <p>{answer}</p>
          </div>
          <hr/>
        </div>
    )
  }

  return (
      <div className="flex row_center row_col" style={{marginTtop: '80px'}}>
        <div className="col-1@xs col-2-3@m">
          <h2 className="bolder center">Остались вопросы?</h2>
          {data.map((item, index) => {
            return <FaqItem key={index} {...item} />
          })}
        </div>
      </div>
  )
}

export default Faq
