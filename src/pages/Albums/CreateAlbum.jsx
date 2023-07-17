import React from 'react'

function CreateAlbum() {
  return (
      <section className="create-albom">
        <div className="container">
          <div className="flex pdd-md-wrapper">
            <div className="col-1@sx col-2-5@m pdd-md-hor mt-3">

              <div className="row row_center">
                <h1 className="bolder">Создание альбома</h1>
                <span className="cleo text-orange ml-1 link"><i className="fa-solid fa-circle-question"></i></span>
              </div>

              <div className="mt-1">
                <div className="row">
                  <div><i className="fa-solid fa-pen-line"></i></div>
                  <p>Придумайте название, добавьте описание и/или <span className="bold text-dark">прикрепите файлы</span> для создания альбома.</p>
                </div>
                <div className="row mt-1">
                  <div><i className="fa-solid fa-lock-hashtag" ></i></div>
                  <p>При необходимости <span className="bold text-dark">добавьте описание и пароль</span> к каждому файлу, установите срок жизни ссылки.</p>
                </div>
                <div className="row mt-1">
                  <div><i className="fa-solid fa-link" ></i></div>
                  <p><span className="bold text-dark">Делитесь ссылкой</span> для просмотра или скачивания архива.</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="title">
                  <input className="col-1@xs" type="text" placeholder="Заголовок (необязательно)"/>
                </div>
                <div className="mt-1">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Описание к альбому…"></textarea>
                </div>
                <div className="limit mt-1 relative">
                  <input className="col-1@xs" type="text" placeholder="Срок хранения файлов"/>
                  <div className="list">
                    <p className="link" data-id="1">1 день</p>
                    <p className="link" data-id="3">3 дня</p>
                    <p className="link" data-id="7">7 дней</p>
                    <p className="link" data-id="14">14 дней</p>
                    <p className="link" data-id="30">30 дней</p>
                    <p className="link" data-id="90">90 дней</p>
                  </div>
                </div>
                <div className="password mt-1">
                  <div className="relative">
                    <input className="input-password col-1@xs" type="password" placeholder="Пароль (необязательно)"/>
                    <div className="input-icon">
                      <i className="eye fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                </div>
                <div className="col-1@xs btn mt-2 hidden-xs hidden-sm active">Создать</div>
              </div>
            </div>

            <div className="col-1@sx col-3-5@m pdd-md-hor set-height mt-3">
              <h1 className="bolder">Вложенные в альбом файлы</h1>

              <p className="mt-1">Вы можете отправить каждый загруженный файл отдельно, не предоставляя доступ ко всему альбому. После создания перейдите в раздел мои альбомы,
                выберите необходимый файл и поделитесь им. (только для зарегистрированных пользователей)</p>
              <div className="cards">

                <div className="mt-2">
                  <div className="card-wrapper">
                    <div className="row row_sb">
                      <p className="bold text-dark">1. IMG_3136.jpg</p>
                      <div className="text-grey link">Удалить</div>
                    </div>
                    <p className="small">1.32 МБ 22/2/23 01:29</p>
                    <div className="flex row-1@xs row-1-2@m">
                      <div className="img-wrapper mt-1">
                        <div className="card img-cover">
                          <img className="" src="/static/img/img005.png" alt=""/>
                        </div>
                      </div>
                      <div className="mt-1">
                        <textarea className="col-1@xs" name="" id="" cols="30" rows="10" placeholder="Описание к фото"></textarea>
                        <div className="password mt-1">
                          <div className="relative">
                            <input className="input-password col-1@xs" type="password" placeholder="Пароль (необязательно)"/>
                            <div className="input-icon">
                              <i className="eye fa-solid fa-eye-slash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="mt-2"/>

                <div className="mt-2 hidden">
                  <div className="card-wrapper">
                    <div className="row row_sb">
                      <p className="bold text-dark">1. IMG_3136.jpg</p>
                      <div className="text-grey link">Удалить</div>
                    </div>
                    <p className="small">1.32 МБ 22/2/23 01:29</p>
                    <div className="flex row-1@xs row-1-2@m">
                      <div className="img-wrapper mt-1">
                        <div className="card img-cover">
                          <img className="" src="/static/img/img001.png" alt=""/>
                        </div>
                      </div>
                      <div className="mt-1">
                        <textarea className="col-1@xs" name="" id="" cols="30" rows="10" placeholder="Описание к фото"></textarea>
                        <div className="password mt-1">
                          <div className="relative">
                            <input className="input-password col-1@xs" type="password" placeholder="Пароль (необязательно)"/>
                            <div className="input-icon">
                              <i className="eye fa-solid fa-eye-slash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="mt-2 hidden"/>

                <div className="mt-2 hidden">
                  <div className="card-wrapper">
                    <div className="row row_sb">
                      <p className="bold text-dark">1. IMG_3136.jpg</p>
                      <div className="text-grey link">Удалить</div>
                    </div>
                    <p className="small">1.32 МБ 22/2/23 01:29</p>

                    <div className="flex row-1@xs row-1-2@m">
                      <div className="img-wrapper mt-1">
                        <div className="card img-cover">
                          <img className="" src="/static/img/img004.png" alt=""/>
                        </div>
                      </div>

                      <div className="mt-1">
                        <textarea className="col-1@xs" name="" id="" cols="30" rows="10" placeholder="Описание к фото"></textarea>
                        <div className="password mt-1">
                          <div className="relative">
                            <input className="input-password col-1@xs" type="password" placeholder="Пароль (необязательно)"/>
                            <div className="input-icon">
                              <i className="eye fa-solid fa-eye-slash"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="row row_end mt-2">
                <div className="btn ml-2 active">Добавить</div>
              </div>

              <div className="col-1@xs btn mt-2 hidden-md hidden-lg">Создать</div>
            </div>
          </div>

        </div>
      </section>
  )
}

export default CreateAlbum
