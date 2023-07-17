import React from 'react'

function Plans() {
  return (
      <div className="container bgPeach">
        <h1 className="bolder center">Выберите подходящий тариф</h1>

        <h3 className="thin center">Активируйте тариф Бизнес
          <span className="bolder relative">
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
                    </div> бесплатно до 1 сентября
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
            <div className="togglePeriod row row_center">
              <p className="month">На месяц</p>
              <div className="ml-1">
                <input type="checkbox" id="switch" />
                <label></label>
              </div>
              <p className="year ml-1">На год</p>
            </div>
          </div>
        </div>

        <div className="cards flex row-1@xs row-1-3@m mt-2 pdd-md-wrapper">

          <div className="pdd-md">
            <div className="card pdd-lg">
              <div className="row row_sb">
                <p className="bold text-dark">Премиум</p>
                <p className="bold"></p>
              </div>
              <h1>10 ГБ</h1>
              <div className="list">
                <p>Стоимость 37$</p>
                <p>Загрузка файла до 10 ГБ</p>
                <p>Создание альбомов</p>
                <p>Срок хранения файлов до 12 месяцев</p>
                <p>Установка пароля к каждому файлу отдельно</p>
                <p>Отчет просмотра файлов</p>
              </div>
              <div className="btn btn-dark row row_col row_center col-1@xs mt-2 active">
                <p>Подключить за 37 $/мес.</p>
                <p className="thin small">При оплате за год + год бесплатно</p>
              </div>
            </div>
          </div>

          <div className="pdd-md">
            <div className="card pdd-lg active">
              <div className="row row_sb">
                <p className="bold text-dark">Бизнес</p>
                <p className="bold text-orange">Бесплатно</p>
              </div>
              <h1>50 ГБ</h1>
              <div className="list">
                <p>Стоимость 107$</p>
                <p>Загрузка файла до 50 ГБ</p>
                <p>Расширенная история изменений</p>
                <p>Создание альбомов</p>
                <p>Срок хранения файлов до 12 месяцев</p>
                <p>Установка пароля к каждому файлу отдельно</p>
                <p>Отчет просмотра файлов</p>
              </div>
              <div className="btn btn-dark row row_col row_center col-1@xs mt-2 active">
                <p>Подключить за 107 $/мес.</p>
                <p className="thin small">При оплате за год</p>
              </div>
              <p className="small center">Акция действует до 1 сентября</p>
            </div>
          </div>

          <div className="pdd-md">
            <div className="card pdd-lg">
              <div className="row row_sb">
                <p className="bold text-dark">Бесплатно</p>
                <p className="bold"></p>
              </div>
              <h1>50 МБ</h1>
              <div className="list">
                <p>Загрузка файла до 50 МБ</p>
                <p>Срок хранения файлов до 30 дней</p>
                <p>Установка пароля к каждому файлу отдельно</p>
                <p>Отчет просмотра файлов</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex row_center row_col" style={{marginTtop: '80px'}}>
          <div className="col-1@xs col-2-3@m">
            <h2 className="bolder center">Остались вопросы?</h2>

            <div className="mt-3">
              <div className="row row_sb row_center">
                <h3>Как оплатить подписку?</h3>
                <div className="icon link">
                  <i className="fa-duotone fa-arrow-down-to-line fa-lg"></i>
                  <i className="fa-duotone fa-arrow-up-to-line fa-lg"></i>
                </div>
              </div>
              <div className="mt-1">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id
                  dicta, quae recusandae magnam optio.
                </p>
              </div>
              <hr/>
            </div>

            <div>
              <div className="row row_sb row_center">
                <h3>Как отключить подписку?</h3>
                <div className="icon link">
                  <i className="fa-duotone fa-arrow-down-to-line fa-lg"></i>
                  <i className="fa-duotone fa-arrow-up-to-line fa-lg"></i>
                </div>
              </div>
              <div className="mt-1">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id
                  dicta, quae recusandae magnam optio.</p>
              </div>
              <hr/>
            </div>

            <div>
              <div className="row row_sb row_center">
                <h3>Что будет, если я перестану платить подписку?</h3>
                <div className="icon link">
                  <i className="fa-duotone fa-arrow-down-to-line fa-lg"></i>
                  <i className="fa-duotone fa-arrow-up-to-line fa-lg"></i>
                </div>
              </div>
              <div className="mt-1">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, labore rerum quis omnis quia quo nemo asperiores quidem vitae ex culpa facere, voluptate soluta id
                  dicta, quae recusandae magnam optio.</p>
              </div>
              <hr/>
            </div>

          </div>
        </div>


      </div>
  )
}

export default Plans
