import React, {useEffect, useState} from 'react'
import {getAlbumsList} from "../../api/manager.js";
import {Link} from "react-router-dom";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {toast} from "react-toastify";
import {baseUrl, formatTime} from "../../service/helper.js";
import Clipboard from 'react-clipboard.js';

function AlbumsListPage() {
  const [loading, setLoading] = useState(true)
  const [albumsList, setAlbumsList] = useState()

  useEffect(() => {
    getAlbumsList().then(({data}) => {
      setAlbumsList(data?.albums)
      setLoading(false)
    })
  }, [])


  /* COMPONENT */
  const AlbumItem = ({name, url, create_date, shelf_time, password, view_count, ...rest}) => {
    const [show, setShow] = useState(false)

    return (
        <div className="card-wrapper pdd-sm">
          <div className="card card-body">
            <div className="row row_sb">
              <h5 className="text-overflow">{name}</h5>
              <div className="row row_center">
                <Link to={`/album/edit/${url}`} className="ml-1">
                  <i className='fa-solid fa-pencil'></i>
                </Link>
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

            <Clipboard className="share row row_center row_sb mt-05 sm" component='a' data-clipboard-text={`${baseUrl()}/album/${url}`}
                       onSuccess={() => {
                         toast.success('Скопировано', {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: 2000
                         })
                       }}>

              <div className="bold text-overflow">
                {`${baseUrl()}/album/${url}`}
              </div>
              <div className="link bold ml-1"><i className="fa-solid fa-clone"></i></div>
            </Clipboard>

            {/*<AlbumImages/>*/}

            <Link to={`/album/${url}`} className="btn btn-default col-1@xs mt-1">Открыть</Link>
          </div>
        </div>
    )
  }
  /* COMPONENT */


  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas albums">
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
      </>

  )
}

export default AlbumsListPage
