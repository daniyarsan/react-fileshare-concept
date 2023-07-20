import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {getAlbumDetails} from "../../api/manager.js";
import {Preloader} from "../../components/Preloader/index.js";

function AlbumPage(props) {
  const {url} = useParams()

  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    })
  }, [])

  console.log(albumDetails)


  return (
      <section className='canvas'>
        {loading && <Preloader/>}

        <div className="container">
          <div className="breadcrumb row mt-3">
            <a href="">Мои альбомы </a>
            <a href=""> / Альбом №4</a>
          </div>

          <div className="row row_center row_sb mt-2">
            <h1 className="bolder">Альбом №4</h1>
            <div className="button delete bold sm link">Удалить альбом</div>
          </div>
          <div className="date">09.06.2023</div>
          <div className="storagePeriod">Срок хранения файлов <span className="days bold">30 дней</span></div>
          <div className="password mt-05">
            <span className=" mr-1">Пароль</span>
            <span className="link line bold">Показать</span>
            <span className="link bold">Fronty34</span>

          </div>
          <div className="share flex row_center mt-05">
            <span className=" mr-1">Ссылка на альбом</span>
            <div>
              <div id="copytoClipboard-alert" className="custom-alert-wrapper relative hidden">
                <div className="custom-alert">
                  <div className="body row">
                    <div>
                      <p className="bolder">Скопировано</p>
                    </div>
                    <div className="img-contain ml-1">
                      <img src="" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div id="shareLink" className="bold text-overflow">https://dropbox/iuchew7a6fwq87ydi8276</div>
            </div>
            <div className="link bold ml-1">
              <i className="fa-solid fa-clone"></i>
            </div>
          </div>
          <div className="description mt-1">
            <span className="bold">Описание</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam asperiores nostrum sint soluta magni, dolorem nisi commodi quo ea mollitia rerum, quos debitis,
              laboriosam minus esse odit sapiente iure a! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia laboriosam rem quis, rerum ipsa ipsum praesentium
              deleniti odio asperiores aut perspiciatis modi assumenda quod sed labore quaerat vel. Eius, atque.</p>
          </div>


          <div className="cards flex row-1-2@xs row-1-4@s row-1-6@m mt-2 pdd-sm-wrapper">

            <div className="card-wrapper pdd-sm galleryItem">
              <div className="card square ">
                <div>
                  <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
                </div>
                <div className="img-cover">
                  <img className="galleryImg" src="/static/img/img001.png" alt=""/>
                </div>
              </div>
              <div className="row row_end row_center mt-1">
                <div className="ml-1">
                  <i className="fa-solid fa-eye"></i>
                  <span className="bold">0</span>
                </div>
                <div className="ml-1">
                  <i className="fa-solid fa-lock-hashtag"></i>
                </div>
                <div className="ml-1">
                  <i className="link icon-open fa-solid fa-arrows-maximize"></i>
                </div>
                <a href="" className="ml-1">
                  <i className="link fa-solid fa-right-to-bracket fa-lg"></i>
                </a>
              </div>
            </div>

            <div className="card-wrapper pdd-sm galleryItem">
              <div className="card square ">
                <div>
                  <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
                </div>
                <div className="img-cover">
                  <img className="galleryImg" src="/static/img/img002.png" alt=""/>
                </div>
              </div>
              <div className="row row_end row_center mt-1">
                <div className="ml-1">
                  <i className="fa-solid fa-eye"></i>
                  <span className="bold">45</span>
                </div>

                <div className="ml-1">
                  <i className="link icon-open fa-solid fa-arrows-maximize"></i>
                </div>
                <a href="" className="ml-1">
                  <i className="link fa-solid fa-right-to-bracket fa-lg"></i>
                </a>
              </div>
            </div>

            <div className="card-wrapper pdd-sm galleryItem">
              <div className="card square ">
                <div>
                  <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
                </div>
                <div className="img-cover">
                  <img className="galleryImg" src="/static/img/img003.png" alt=""/>
                </div>
              </div>
              <div className="row row_end row_center mt-1">
                <div className="ml-1">
                  <i className="fa-solid fa-eye"></i>
                  <span className="bold">7</span>
                </div>
                <div className="ml-1">
                  <i className="fa-solid fa-lock-hashtag"></i>
                </div>
                <div className="ml-1">
                  <i className="link icon-open fa-solid fa-arrows-maximize"></i>
                </div>
                <a href="" className="ml-1">
                  <i className="link fa-solid fa-right-to-bracket fa-lg"></i>
                </a>
              </div>
            </div>

            <div className="card-wrapper pdd-sm galleryItem">
              <div className="card square ">
                <div>
                  <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
                </div>
                <div className="img-cover">
                  <img className="galleryImg" src="/static/img/img004.png" alt=""/>
                </div>
              </div>
              <div className="row row_end row_center mt-1">
                <div className="ml-1">
                  <i className="fa-solid fa-eye"></i>
                  <span className="bold">3</span>
                </div>

                <div className="ml-1">
                  <i className="link icon-open fa-solid fa-arrows-maximize"></i>
                </div>
                <a href="" className="ml-1">
                  <i className="link fa-solid fa-right-to-bracket fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="row row_start mt-2">
            <div className="btn active">Скачать альбом архивом</div>
          </div>
        </div>
      </section>
  )
}

export default AlbumPage
