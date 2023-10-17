import React, {useContext} from 'react'
import {baseUrl} from "../../../service/utility.js"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
import Clipboard from 'react-clipboard.js'
import DeleteDialog from "../../UI/DeleteDialog.jsx"
import Promotion from "../../Promotion/Promotion.jsx"
import {getNoun} from "../../../service/TimeConverter.js"
import {ALBUM_DELETE_PUBLIC} from "../../../api/const.js"
import {AuthContext} from "../../../contexts/AuthProvider.jsx"
import store from "../../../store/store.js"
import {RequestContext} from "../../../contexts/RequestProvider.jsx"

function AlbumSuccessPublic({createdAlbum, setCreatedAlbum}) {

  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const {requester} = useContext(RequestContext);
  const { setLoader } = useContext(AuthContext);

  const handleRemoveAlbum = (url) => {
    setLoader(true)

    requester.get(`${ALBUM_DELETE_PUBLIC}/${url}/${password}`).then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      setLoader(false)
      setAlbumUploadResult(null)
      navigate('/')
    })
  }

  return (
      <div className="flex row-1@xs row-1-3@m mt-3">
        <div></div>

        <div className="h100 pdd-md">
          <div>
            <h1 className="bolder mt-6">Успешно</h1>
            <p className="small bold text-grey">Зарегистрирутесь, чтобы иметь доступ ко всем созданным альбомам</p>

            <Clipboard className="row row_center mt-1" component='a' data-clipboard-text={createdAlbum.getAlbumFullUrl()} onSuccess={() => {
              toast.success('Скопировано', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
              })
            }}>
              <div id="shareLink" className="bold text-overflow">{createdAlbum.getAlbumFullUrl()}</div>
              <div className="link bold ml-1 text-orange">
                <i className="fa-solid fa-clone"></i>
              </div>
            </Clipboard>

            <div className="storagePeriod mt-1">Срок хранения файлов <span className="days bold">{createdAlbum.getStorageDaysWithNoun()}</span></div>

            <div className="mt-2 row row_center row_sb">
              {currentUser.isAuthorized ? <Link to='/albums' className="col-1-2@xs btn mr-2 active">Мои альбомы</Link> : <Link to='/registration' className="col-1-2@xs btn mr-2 active">Регистрация</Link>}
              <Clipboard className="col-1-2@xs btn active" component='div' data-clipboard-text={createdAlbum.getAlbumFullUrl()} onSuccess={() => {
                toast.success('Скопировано', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
              }}>
                Скопировать
              </Clipboard>
            </div>

            <div className="mt-2 row row_center row_col">
              <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {handleRemoveAlbum(createdAlbum.url)}}>
                <span className="link text-grey line">Уничтожить альбом</span>
              </DeleteDialog>

            </div>
          </div>
        </div>
        <div className="mt-2  pdd-md">
          <Promotion/>
        </div>
      </div>
  )
}

export default AlbumSuccessPublic
