import React, {useEffect, useState} from 'react'
import {deleteAlbum, getAlbumsList} from "../../api/manager.js";
import {Link} from "react-router-dom";
import {Preloader} from "../../components/Preloader/index.js";
import {BASE_URL} from "../../api/const.js";
import {toast} from "react-toastify";
import {formatTime} from "../../service/helper.js";

function AlbumsPage() {
  const [loading, setLoading] = useState(true)
  const [albumsList, setAlbumsList] = useState()

  useEffect(() => {
    getAlbumsList().then(({data}) => {
      setAlbumsList(data?.albums)
      setLoading(false)
    })
  }, [])

  const handleRemoveAlbum = (url) => {
    deleteAlbum(url).then(resp => {
      window.location.reload()
    })
  }

  const AlbumAlert = ({show, setShow, url}) => {
    return (
        <div className={`custom-alert-wrapper relative ${!show ? 'hidden' : ''}`}>
          <div className="custom-alert">
            <div className="body">
              <div className="row">
                <div>
                  <p className="f-700">Подтвердите удаление альбома</p>
                </div>
                <div className="img-contain ml-1">
                </div>
              </div>
              <div className="btns row mt-1">
                <div className="link small text-grey" onClick={() => {
                  setShow(false)
                }}>Отмена
                </div>
                <div className="link small ml-2" onClick={() => {
                  handleRemoveAlbum(url)
                }}>Удалить
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  const AlbumImages = () => {
    return (
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
    )
  }

  const AlbumItem = ({name, url, password, create_date, shelf_time, view_count}) => {
    const [show, setShow] = useState(false)

    return (
        <div className="card-wrapper pdd-sm">

          <AlbumAlert show={show} setShow={setShow} url={url}/>

          <div className="card card-body">
            <div className="row row_sb">
              <h5 className="text-overflow">{name}</h5>
              <div className="row row_center">
                <div className="ml-1">
                  <i className="fa-solid fa-lock-hashtag"></i>
                </div>
                <div className="remove link" onClick={() => {
                  setShow(!show)
                }}>
                  <i className="fa-solid fa-trash-xmark"></i>
                </div>
              </div>
            </div>
            <div className="date sm mt-05">{formatTime(Date.parse(create_date))}</div>
            <div className="storagePeriod sm">Просмотров: <span className="days bold">{view_count}</span></div>

            <div className="storagePeriod sm">Срок хранения: <span className="days bold">{shelf_time} дней</span></div>
            <div className="share row row_center row_sb mt-05 sm">
              <div className="bold text-overflow">
                {`${BASE_URL}/${url}`}
              </div>
              <div className="link bold ml-1" onClick={() => {
                navigator.clipboard.writeText(`${BASE_URL}/${url}`)

                toast.success('Скопировано', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
              }}><i className="fa-solid fa-clone"></i></div>
            </div>

            {/*<AlbumImages/>*/}

            <Link to={`/album/${url}`} className="btn btn-default col-1@xs mt-1">Открыть</Link>
          </div>
        </div>
    )
  }

  return (
      <section className="canvas albums">
        {loading && <Preloader/>}

        <div className="container">
          <div className="breadcrumb row mt-3">
            <a href="">Мои альбомы</a>
          </div>
          <h1 className="bolder">Мои альбомы</h1>

          <div className="cards flex row-1@xs row-1-2@s row-1-4@m pdd-sm-wrapper">

            {albumsList && albumsList.map(item => {
              return <AlbumItem key={item.url} {...item} />
            })}

          </div>

        </div>
      </section>
  )
}

export default AlbumsPage
