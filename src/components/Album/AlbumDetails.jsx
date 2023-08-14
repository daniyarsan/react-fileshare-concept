import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {deleteAlbum, getAlbumDetails, getFullImage} from "../../api/manager.js";
import {baseUrl, formatTime} from "../../service/helper.js";
import {toast} from "react-toastify";
import Modal from "../UI/Modal/Modal.jsx";

function AlbumDetails({url, albumDetails}) {
  const [modalContent, setModalContent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleRemoveAlbum = () => {
    deleteAlbum(url).then(resp => {
      navigate('/albums')
    })
  }

  const ImageCard = ({index, url, image}) => {
    return (
        <div className="card-wrapper pdd-sm galleryItem">
          <div className="card square ">
            <div>
              <i className="icon-close text-white fa-solid fa-xmark fa-xl"></i>
            </div>
            <div className="img-cover">
              <img className="galleryImg" src={`data:image/jpeg;base64,${image}`}/>
            </div>
          </div>
          <div className="row row_end row_center mt-1">
            <div className="ml-1">
              <i className="fa-solid fa-eye"></i>
              <span className="bold"> 0</span>
            </div>
            <div className="ml-1" onClick={() => {
              setLoading(true)
              getFullImage({index: index, url: url}).then(({data}) => {
                setLoading(false)
                const modalContent = <img src={`data:image/jpeg;base64,${data.data}`}/>
                setModalContent(modalContent)
              }).catch(err => {
                console.log(err)
              })
            }}>
              <i className="link icon-open fa-solid fa-arrows-maximize"></i>
            </div>
          </div>
        </div>
    )
  }

  return (
      <>
        <section className='canvas'>
          <div className="container">
            <div className="breadcrumb row mt-3">
              <Link to="/albums">Мои альбомы | </Link>
              <Link to='#'>{albumDetails?.album?.name}</Link>
            </div>

            <div className="row row_center row_sb mt-2">
              <h1 className="bolder">{albumDetails?.album?.name}</h1>
              <Link to={`/album/edit/${url}`} className="bold sm"><i></i>Редактировать альбом</Link>
            </div>
            <div className="date">{formatTime(Date.parse(albumDetails?.album?.create_date))}</div>
            <div className="storagePeriod">Срок хранения файлов <span className="days bold">{albumDetails?.album?.shelf_time} дней</span></div>
            <div className="password mt-05">
              <span className="mr-1 link" onClick={() => {
                setShowPassword(!showPassword)
              }}>{showPassword ? 'Спрятать' : 'Показать'} Пароль:</span>

              <span className="bold">{showPassword ? albumDetails?.album?.password : '************'}</span>
            </div>

            <div className="share flex row_center mt-05">
              <span className=" mr-1">Ссылка на альбом:</span>
              <div>
                <div id="shareLink" className="bold text-overflow">{`${baseUrl()}/album/${url}`}</div>
              </div>
              <div className="link bold ml-1" onClick={() => {
                navigator.clipboard.writeText(albumDetails?.album?.url)
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
              <p>{albumDetails?.description}</p>
            </div>

            <div className="cards flex row-1-2@xs row-1-4@s row-1-6@m mt-2 pdd-sm-wrapper">
              {albumDetails?.images.map((image, index) => {
                return <ImageCard key={index} index={index} url={url} image={image.data}/>
              })}
            </div>

            <div className="row row_start mt-2">
              <div className="btn active">Скачать альбом архивом</div>
            </div>
          </div>
        </section>

        {modalContent && <Modal closeEvent={() => setModalContent(false)}>{modalContent}</Modal>}
      </>
  )
}

export default AlbumDetails