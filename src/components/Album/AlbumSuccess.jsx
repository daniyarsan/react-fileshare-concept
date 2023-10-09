import React from 'react'
import {baseUrl} from "../../service/utility.js";
import {toast} from "react-toastify";
import {deleteAlbum, deleteAlbumPublic} from "../../api/manager.js";
import {Link, useNavigate} from "react-router-dom";
import Clipboard from 'react-clipboard.js';
import {useSelector} from "react-redux";
import DeleteDialog from "../UI/DeleteDialog.jsx";
import Promotion from "../Promotion/Promotion.jsx";
import {getNoun} from "../../service/TimeConverter.js";

function AlbumSuccess({name, password, create_date, shelf_time, url, view_count}) {
  const navigate = useNavigate()
  const {isAuth} = useSelector(state => state.user)

  const handleRemoveAlbum = (url) => {
    const albumDeleter = isAuth ? deleteAlbum(url) : deleteAlbumPublic(url, password);
    albumDeleter.then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      navigate('/albums')

    }).catch(err => {
      // console.log(err)
    })
  }

  return (
      <div className="flex row-1@xs row-1-3@m mt-3">
        <div></div>

        <div className="h100 pdd-md">
          <div>
            <h1 className="bolder mt-6">Успешно</h1>
            <p className="small bold text-grey">Зарегистрирутесь, чтобы иметь доступ ко всем созданным альбомам</p>

            <Clipboard className="row row_center mt-1" component='a' data-clipboard-text={`${baseUrl()}/album/${url}/${password}`} onSuccess={() => {
              toast.success('Скопировано', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
              })
            }}>
              <div id="shareLink" className="bold text-overflow">{`${baseUrl()}/album/${url}/${password}`}</div>
              <div className="link bold ml-1 text-orange">
                <i className="fa-solid fa-clone"></i>
              </div>
            </Clipboard>

            <div className="storagePeriod mt-1">Срок хранения файлов <span className="days bold">{shelf_time / 24} {getNoun(Math.floor((shelf_time / 24)), 'день', 'дня', 'дней')}</span></div>

            <div className="mt-2 row row_center row_sb">
              {isAuth ? <Link to='/albums' className="col-1-2@xs btn mr-2 active">Мои альбомы</Link> : <Link to='/registration' className="col-1-2@xs btn mr-2 active">Регистрация</Link>}

              <Clipboard className="col-1-2@xs btn active" component='div' data-clipboard-text={`${baseUrl()}/album/${url}/${password}`} onSuccess={() => {
                toast.success('Скопировано', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
              }}>
                Скопировать
              </Clipboard>
            </div>

            <div className="mt-2 row row_center row_col">
              <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {handleRemoveAlbum(url)}}>
                <span className="link text-grey line">Уничтожить альбом</span>
              </DeleteDialog>

            </div>
          </div>
        </div>
        <div className="mt-2  pdd-md">
          { !isAuth && <Promotion /> }
        </div>
      </div>
  )
}

export default AlbumSuccess
