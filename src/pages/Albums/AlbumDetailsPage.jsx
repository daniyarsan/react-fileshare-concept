import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteAlbum, getAlbumDetails} from "../../api/manager.js";
import {Preloader} from "../../components/Preloader/index.js";
import {toast} from "react-toastify";
import {baseUrl, formatTime} from "../../service/helper.js";

function AlbumDetailsPage(props) {
  const {url} = useParams()

  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    }).catch(err => {
      navigate('/albums')
    })
  }, [])

  const handleRemoveAlbum = () => {
    deleteAlbum(url).then(resp => {
      navigate('/albums')
    })
  }

  const Image = ({ src, ...props }) => <img src={`data:image/jpeg;base64,${src}`} {...props} />

  const ImageCard = ({data}) => {
    return (
        <div className="card-wrapper pdd-sm galleryItem">
          <div className="card square ">
            <div>
              <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
            </div>
            <div className="img-cover">
              <Image className="galleryImg" src={data} alt="" />
            </div>
          </div>
          <div className="row row_end row_center mt-1">
            <div className="ml-1">
              <i className="fa-solid fa-eye"></i>
              <span className="bold"> 0</span>
            </div>
            <div className="ml-1">
              <i className="link icon-open fa-solid fa-arrows-maximize"></i>
            </div>

          </div>
        </div>
    )
  }

  const ContentView = ({album, description, images}) => {
    return (
        <section className='canvas'>
          <div className="container">
            <div className="breadcrumb row mt-3">
              <Link to="/albums">Мои альбомы | </Link>
              <Link to='#'>{album?.name}</Link>
            </div>

            <div className="row row_center row_sb mt-2">
              <h1 className="bolder">{album?.name}</h1>
              <div className="button delete bold sm link" onClick={handleRemoveAlbum}>Удалить альбом</div>
            </div>
            <div className="date">{formatTime(Date.parse(album?.create_date))}</div>
            <div className="storagePeriod">Срок хранения файлов <span className="days bold">{album?.shelf_time} дней</span></div>
            <div className="password mt-05">
              <span className="mr-1 link" onClick={() => {
                setShowPassword(!showPassword)
              }}>{showPassword ? 'Спрятать' : 'Показать'} Пароль:</span>

              <span className="bold">{showPassword ? album?.password : '************'}</span>
            </div>

            <div className="share flex row_center mt-05">
              <span className=" mr-1">Ссылка на альбом:</span>
              <div>
                <div id="shareLink" className="bold text-overflow">{`${baseUrl()}/album/${url}`}</div>
              </div>
              <div className="link bold ml-1" onClick={() => {
                navigator.clipboard.writeText(album?.url)
                toast.success('URL успешно скопирован', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
              }}>
                <i className="fa-solid fa-clone"></i>
              </div>
            </div>
            <div className="description mt-1">
              <span className="bold">Описание</span>
              <p>{description}</p>
            </div>


            <div className="cards flex row-1-2@xs row-1-4@s row-1-6@m mt-2 pdd-sm-wrapper">
              {images.map((image, index) => {
                return <ImageCard key={index} {...image} />
              })}
            </div>

            <div className="row row_start mt-2">
              <div className="btn active">Скачать альбом архивом</div>
            </div>
          </div>
        </section>
    )
  }



  return (
      <>
        { loading ?  <Preloader/> : <ContentView {...albumDetails} /> }
      </>
  )
}

export default AlbumDetailsPage
