import React, {useContext, useEffect, useState} from 'react'
import {toast} from "react-toastify";
import Modal from "../../UI/Modal/Modal.jsx";
import Clipboard from 'react-clipboard.js';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ALBUM_DELETE, ALBUM_DETAILS, ALBUM_FULL_IMAGE, API_URL} from "../../../api/const.js";
import {Link, useNavigate} from "react-router-dom";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import DeleteDialog from "../../UI/DeleteDialog.jsx";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import AlbumDetailsLoading from "./AlbumDetailsLoading.jsx";
import {Album} from "../../../models/Album.js";

function AlbumDetails({url}) {
  const { loader, setLoader } = useContext(AuthContext);

  const {requester} = useContext(RequestContext);
  const navigate = useNavigate()
  const [modalContent, setModalContent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [albumDetails, setAlbumDetails] = useState()
  const [images, setImages] = useState()
  const [description, setDescription] = useState()


  useEffect(() => {
    setLoader(true)
    requester.post(`${ALBUM_DETAILS}`, {url}).then(({data}) => {
      setImages(data.images)
      setAlbumDetails(new Album(data?.album))
      setDescription(data.description)
      setLoader(false)
    })

  }, [])


  const handleRemoveAlbum = (url) => {
    setLoader(true)
    requester.post(`${ALBUM_DELETE}`, {url}).then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      navigate('/albums')
    })
  }


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
    setLoader(true)
    requester.post(`${ALBUM_FULL_IMAGE}`, {index, url}).then(({data}) => {
      setLoader(false)
      const modalContent = <img src={`data:image/jpeg;base64,${data.data}`}/>
      setModalContent(modalContent)
    })
  }


  const ImageCard = ({index, image}) => {
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

            <div className="ml-1" onClick={() => handleFullImageOpen(index)}>
              <i className="link icon-open fa-solid fa-arrows-maximize"></i>
            </div>
          </div>
        </div>
    )
  }

  if (loader || !albumDetails) {
    return <AlbumDetailsLoading />
  }

  return (
      <div className='album-details'>
        <div className="breadcrumb row mt-3">
          <Link to="/albums">Мои альбомы | </Link>
          <Link to='#'>{albumDetails.name}</Link>
        </div>

        <div className="row row_end row_sb mt-2">
          <Link to={albumDetails.getEditAlbumUri()} className="bold sm"><i></i>Редактировать альбом</Link>
        </div>


        <div className="row row_center row_sb mt-2">
          <h1 className="bolder">{albumDetails.name}</h1>
        </div>
        <div className="date">
          <span className="mr-1">Создан:</span>
          <span className="mr-1">{albumDetails.getCreatedDate()}</span>
        </div>
        <div className="storagePeriod">Срок хранения файлов: <span className="days bold">{albumDetails.getStorageDaysWithNoun()}</span></div>
        <div className="password mt-05">
          <span className="mr-1">Пароль:</span>
          <span className="bold" onClick={() => {
            setShowPassword(!showPassword)
          }}>{showPassword ? albumDetails?.password : '************'}
              </span>

          <Clipboard className="link bold ml-1" component='a' data-clipboard-text={albumDetails?.password} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          }}><i className="fa-solid fa-clone"></i></Clipboard>
        </div>

        <div className="row mt-05">
          <span className="mr-1">Ссылка на альбом:</span>
          <Clipboard className="link bold ml-1" component='a' data-clipboard-text={albumDetails.getAlbumPublicUrl()} onSuccess={() => {
            toast.success('Скопировано', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })}}>

            <div id="shareLink" className="bold text-overflow">{albumDetails.getAlbumPublicUrl()} <i className="fa-solid fa-clone"></i></div>
          </Clipboard>
        </div>

        <div className="description mt-1">
          <span className="bold">Описание: </span>
          <p>{description}</p>
        </div>

        <div className="cards flex row-1-2@xs row-1-4@s row-1-6@m mt-2 pdd-sm-wrapper">

          {images && images.map((image, index) => {
            return <ImageCard key={index} index={index} image={image.data}/>
          })}

        </div>

        <div className="row row_start mt-2">
          <a href={albumDetails.getFileDownloadUrl()} className="btn active">Скачать альбом архивом</a>
        </div>

        {modalContent && <Modal closeEvent={() => setModalContent(false)}>{modalContent}</Modal>}

        <div className="row row_start mt-2">
          <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {
            handleRemoveAlbum(url)
          }}>
            <div className="btn danger">Удалить альбом</div>
          </DeleteDialog>
        </div>
      </div>
  )
}

export default AlbumDetails
