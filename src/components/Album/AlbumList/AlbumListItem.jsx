import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DeleteDialog from "../../UI/DeleteDialog.jsx";
import {formatTime} from "../../../service/TimeConverter.js";
import Clipboard from "react-clipboard.js";
import {baseUrl} from "../../../service/utility.js";
import {toast} from "react-toastify";
import {ALBUM_DELETE} from "../../../api/const.js";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";

const AlbumListItem = ({name, url, create_date, shelf_time, password, view_count, ...rest}) => {
  const {requester} = useContext(RequestContext);
  const navigate = useNavigate()

  const handleRemoveAlbum = (url) => {
    // setLoading(true)

    requester.post(`${ALBUM_DELETE}`, {url}).then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

      window.location.reload('/albums')
    })
  }

  return (
      <div className="card-wrapper pdd-sm">
        <div className="card card-body">
          <div className="row row_sb">
            <h5 className="text-overflow">{name}</h5>
            <div className="row row_center">
              <Link to={`/album/edit/${url}`} className="ml-1">
                <i className='fa-solid fa-pencil'></i>
              </Link>
              <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {handleRemoveAlbum(url)}}>
                <div className="remove link">
                  <i className="fa-solid fa-trash-xmark"></i>
                </div>
              </DeleteDialog>

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

export default AlbumListItem;