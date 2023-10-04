import React, {useEffect, useState} from 'react'
import {baseUrl} from "../../service/utility.js";
import {formatTime, secondsToDays} from "../../service/TimeConverter.js";
import {toast} from "react-toastify";
import Modal from "../UI/Modal/Modal.jsx";
import Clipboard from 'react-clipboard.js';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {API_URL} from "../../api/const.js"; // Import css

function AlbumDetails({url, albumDetails, setLoading, fullImageOpenHandler}) {
  const [modalContent, setModalContent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const password = albumDetails?.album?.password


  /* On Escape close modal */
  const escFunction = (ev) => {
    if (ev.key === "Escape") {
      setModalContent(false)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  }, []);


  const handleFullImageOpen = (index) => {
    setLoading(true)
    fullImageOpenHandler(index).then(({data}) => {
      setLoading(false)
      const modalContent = <img src={`data:image/jpeg;base64,${data.data}`}/>
      setModalContent(modalContent)
    }).catch(err => {
      // console.log(err)
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
              <img className="galleryImg pointer" onClick={() => handleFullImageOpen(index)} src={`data:image/jpeg;base64,${image}`}/>
            </div>
          </div>
          <div className="row row_end row_center mt-1">
            <div className="ml-1">
              <i className="fa-solid fa-eye"></i>
              <span className="bold"> 0</span>
            </div>

            <div className="ml-1" onClick={() => handleFullImageOpen(index)}>
              <i className="link icon-open fa-solid fa-arrows-maximize"></i>
            </div>
          </div>
        </div>
    )
  }

  return (
      <>
        <div className="row row_center row_sb mt-2">
          <h1 className="bolder">{albumDetails?.album?.name}</h1>
        </div>
        <div className="date">
          <span className="mr-1">Создан:</span>
          <span className="mr-1">{formatTime(Date.parse(albumDetails?.album?.create_date))}</span>
        </div>
        <div className="storagePeriod">Срок хранения файлов <span className="days bold">{secondsToDays(albumDetails?.album?.time_to_delete)} дня</span></div>
        <div className="password mt-05">
          <span className="mr-1">Пароль:</span>
          <span className="bold" onClick={() => {
            setShowPassword(!showPassword)
          }}>{showPassword ? albumDetails?.album?.password : '************'}
              </span>

          <Clipboard className="link bold ml-1" component='a' data-clipboard-text={albumDetails?.album?.password} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}><i className="fa-solid fa-clone"></i></Clipboard>
        </div>

        <div className="row mt-05">
          <span className="mr-1">Ссылка на альбом:</span>
          <Clipboard className="link bold ml-1" component='a' data-clipboard-text={`${baseUrl()}/album/${url}/${password}`} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}>
            <div id="shareLink" className="bold text-overflow">{`${baseUrl()}/album/${url}`} <i className="fa-solid fa-clone"></i></div>
          </Clipboard>
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
          <a href={`//${API_URL}/api/album/anon/download/${url}`} className="btn active">Скачать альбом архивом</a>
        </div>

        {modalContent && <Modal closeEvent={() => setModalContent(false)}>{modalContent}</Modal>}
      </>
  )
}

export default AlbumDetails
