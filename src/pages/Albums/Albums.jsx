import React from 'react'

function Albums() {
  return (
      <section className="myAlboms">
        <div className="container">
          <div className="breadcrumb row mt-3">
            <a href="">Мои альбомы</a>
          </div>
          <h1 className="bolder">Мои альбомы</h1>


          <div className="cards flex row-1@xs row-1-2@s row-1-4@m pdd-sm-wrapper">

            <div className="card-wrapper pdd-sm">
              <div className="custom-alert-wrapper relative">
              <div className="custom-alert">
                <div className="body">
                  <div className="row">
                    <div>
                      <p className="f-700">Подтвердите удаление альбома</p>
                    </div>
                    <div className="img-contain ml-1">
                      <img src="" alt="" />
                    </div>
                  </div>
                  <div className="btns row mt-1">
                    <div className="link small text-grey">Отмена</div>
                    <div className="link small ml-2">Удалить</div>
                  </div>

                </div>
              </div>
            </div>
            <div className="card card-body">
              <div className="row row_sb">
                <h5 className="text-overflow">Длинное название альбома</h5>
                <div className="row row_center">
                  <div className="ml-1">
                    <i className="fa-solid fa-lock-hashtag"></i>
                  </div>
                  <div className="remove link">
                  <i className="fa-solid fa-trash-xmark"></i>
                </div>
              </div>
            </div>
            <div className="date sm mt-05">09.06.2023</div>
            <div className="storagePeriod sm">Просмотров <span className="days bold">7</span></div>

            <div className="storagePeriod sm">Срок хранения <span className="days bold">30 дней</span></div>
            <div className="share row row_center row_sb mt-05 sm">
              <div className="bold text-overflow">
                https://dropbox/iuchew7a6fwq87ydi8276
              </div>
              <a className="link bold ml-1" href=""><i className="fa-solid fa-clone"></i></a>
            </div>
            <div className="preview row row-1-3@xs pdd-xs-wrapper mt-1">
              <div className="pdd-xs">
                <div className="card-xs img-cover square">
                  <img src="/static/img/img001.png" alt=""/>
                </div>
              </div>
              <div className="pdd-xs">
                <div className="card-xs img-cover square">
                  <img src="/static/img/img002.png" alt=""/>
                </div>
              </div>
              <div className="pdd-xs">
                <div className="card-xs img-cover square">
                  <img src="/static/img/img003.png" alt=""/>
                </div>
              </div>
            </div>
            <div className="btn btn-default col-1@xs mt-1">Открыть</div>
          </div>
        </div>
          </div>
      
      
        </div>
      </section>
  )
}

export default Albums
