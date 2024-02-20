import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import DeleteDialog from "../../UI/DeleteDialog/DeleteDialog.jsx";
import Clipboard from "react-clipboard.js";
import {toast} from "react-toastify";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";

const AlbumListItem = ({album, handleRemoveAlbum}) => {

  const { currentUser } = useContext(AuthContext);


  return (
      <div className="card-wrapper pdd-sm">
        <div className="card card-body">
          <div className="row row_sb">
            <h5 className="text-overflow">{album.name}</h5>
            <div className="row row_center">
              {currentUser.tariff.option == 'PricingOption.option2' && (
                  <Link to={`/album/edit/${album.url}`} className="ml-1">
                    <i className='fa-solid fa-pencil'></i>
                  </Link>
              )}


              <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {handleRemoveAlbum(album.url)}}>
                <div className="remove link">
                  <i className="fa-solid fa-trash-xmark"></i>
                </div>
              </DeleteDialog>

            </div>
          </div>
          <div className="date sm mt-05">{album.getCreatedDate()}</div>
          <div className="storagePeriod sm">Просмотров: <span className="days bold">{album.view_count}</span></div>

          <div className="storagePeriod sm">Срок хранения: <span className="days bold">{album.getStorageDaysWithNoun()}</span></div>
          <div className="storagePeriod sm">Осталось: <span className="days bold">{album.getTimeToDeleteInHours()}</span></div>

          <Clipboard className="share row row_center row_sb mt-05 sm" component='a' data-clipboard-text={album.getAlbumShowUrl()}
                     onSuccess={() => {
                       toast.success('Скопировано', {
                         position: toast.POSITION.TOP_RIGHT,
                         autoClose: 2000
                       })
                     }}>

            <button className="btn btn-default col-1@xs mt-1">Поделиться <i className="fa fa-solid fa-link"></i></button>
          </Clipboard>

          {/*<AlbumImages/>*/}

          <Link to={`/album/${album.url}`} className="btn btn-default col-1@xs mt-1">Открыть</Link>
        </div>
      </div>
  )
}

export default AlbumListItem;