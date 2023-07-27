import React, {useEffect, useState} from 'react'
import {getPricing} from "../../api/manager.js";
import {Preloader} from "../../components/Preloader/index.js";

function PricingPage() {
  const [loading, setLoading] = useState(true)
  const [isMonthly, setIsMonthly] = useState(true)
  const [pricing, setPricing] = useState([])
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

  const Question = ({question, answer}) => {
    const [show, setShow] = useState()

    return (
        <div className="mt-3">
          <div className="row row_sb row_center">
            <h3>{question}</h3>
            <div className="icon link" onClick={() => {
              setShow(!show)
            }}>
              {show ? (<i className="fa-duotone fa-arrow-down-to-line fa-lg"></i>) : (<i className="fa-duotone fa-arrow-up-to-line fa-lg"></i>)}
            </div>
          </div>
          <div className={`mt-1 ${show ? '' : 'hidden'}`}>
            <p>{answer}</p>
          </div>
          <hr/>
        </div>
    )
  }

  const PricingCard = ({option, size, price, shelf_time, files}) => {
    return (
        <div className="pdd-md">
          <div className="card pdd-lg">
            <div className="row row_sb">
              <p className="bold text-dark">{option}</p>
              <p className="bold"></p>
            </div>
            <h1>{size} ГБ</h1>
            <div className="list">
              <p>Стоимость {price}$</p>
              <p>Загрузка файла до {size} ГБ</p>
              <p>Срок хранения файлов до {shelf_time} месяцев</p>
              {/**/}
              <p>Создание альбомов</p>
              <p>Установка пароля к каждому файлу отдельно</p>
              <p>Отчет просмотра файлов</p>
            </div>
            <div className="btn btn-dark row row_col row_center col-1@xs mt-2 active">
              <p>Подключить за {price} $/мес.</p>
              <p className="thin small">При оплате за год + год бесплатно</p>
            </div>
          </div>
        </div>
    )
  }

  const TimerAlert = () => {
    return (
        <div className="custom-alert timer">
          <div className="row row_end">
            <div className="icon-close">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="body row">
            <div className="row row_center" style={{lineHeight: '24px'}}>
              <div className="">
                <h1>74</h1>
                <p className="bolder">дн</p>
              </div>
              <div className="ml-1">
                <h1 className="thin">05</h1>
                <p>мин</p>
              </div>
              <div className="ml-1">
                <h1 className="thin">12</h1>
                <p>сек</p>
              </div>
            </div>
            <div className="img-contain ml-2" style={{width: '40px'}}>
              <img src="/static/img/emoji/icon_001.svg" alt=""/>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className='canvas bgPeach'>

        {loading ? <Preloader/> :
            (
                <div className="container">
                  <h1 className="bolder center">Выберите подходящий тариф</h1>
                  <h3 className="thin center">Активируйте тариф Бизнес
                    <span className="bolder relative">

                       {/*<TimerAlert />*/}

                      бесплатно до 1 сентября
                    </span>
                  </h3>

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
                        <i className="fa-solid fa-people-group mr-1"></i> Корпоративный
                      </div>
                    </div>

                    <div className="row row_end">
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

                  </div>

                  <div className="cards flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">
                    {
                      (isMonthly ? monthlyPlans : yearlyPlans).map(item => {
                        return <PricingCard key={item.option} {...item} />
                      })
                    }
                  </div>

                  <hr/>

                  <div className="flex row_center row_col" style={{marginTtop: '80px'}}>
                    <div className="col-1@xs col-2-3@m">
                      <h2 className="bolder center">Остались вопросы?</h2>

                      {faq.map((item, index) => {
                        return <Question key={index} {...item} />
                      })}

                    </div>
                  </div>


                </div>
            )
        }

      </div>
  )
}

export default PricingPage
