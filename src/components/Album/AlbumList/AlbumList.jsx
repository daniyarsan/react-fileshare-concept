import React, {useContext, useEffect, useState} from 'react';
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {ALBUM_DELETE, ALBUMS_LIST} from "../../../api/const.js";
import AlbumListItem from "./AlbumListItem.jsx";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import {Album} from "../../../models/Album.js";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";


const AlbumList = () => {
  const {requester} = useContext(RequestContext);
  const {state} = useLocation();
  const navigate = useNavigate();
  const {setLoader} = useContext(AuthContext);
  const [albumsList, setAlbumsList] = useState()

  const fetchAlbumList = () => {
    setLoader(true)
    requester.post(`${ALBUMS_LIST}`).then(({data}) => {
      const albumsList = data?.albums.map(item => {
        return new Album(item)
      })

      setAlbumsList(albumsList)
      setLoader(false)
    })
  }

  useEffect(() => {
    fetchAlbumList()
  }, [])


  const handleRemoveAlbum = (url) => {
    setLoader(true)
    requester.post(`${ALBUM_DELETE}`, {url}).then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      fetchAlbumList()
    })
  }


  return (
      <div className="albums">
        <div className="breadcrumb row mt-3">
          <a href="">Мои альбомы</a>
        </div>
        <h1 className="bolder">Мои альбомы</h1>

        <div className="mt-3 flex row-1@xs row-1-3@m">
          <div></div>
          <div className="pdd-md">
            <p>Нет созданных альбомов...</p>
          </div>
          <div></div>
        </div>

        <div className="cards flex row-1@xs row-1-2@s row-1-4@m pdd-sm-wrapper">


          {albumsList && albumsList.map(album => {
            return <AlbumListItem key={album.url} album={album} handleRemoveAlbum={handleRemoveAlbum}/>
          })}
        </div>
      </div>
);
};

export default AlbumList;