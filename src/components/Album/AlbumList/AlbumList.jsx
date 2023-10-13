import React, {useContext, useEffect, useState} from 'react';
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {ALBUMS_LIST} from "../../../api/const.js";
import AlbumListItem from "./AlbumListItem.jsx";
import store from "../../../store/store.js";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";


const AlbumList = () => {
  const {requester} = useContext(RequestContext);
  const [albumsList, setAlbumsList] = useState()
  const { setLoader } = useContext(AuthContext);

  useEffect(() => {
    setLoader(true)
    requester.post(`${ALBUMS_LIST}`).then(({data}) => {
      setAlbumsList(data?.albums)
      setLoader(false)
    })
  }, [])


  return (
      <div className="albums">
        <div className="breadcrumb row mt-3">
          <a href="">Мои альбомы</a>
        </div>
        <h1 className="bolder">Мои альбомы</h1>

        <div className="cards flex row-1@xs row-1-2@s row-1-4@m pdd-sm-wrapper">
          {albumsList && albumsList.map(item => {
            return <AlbumListItem key={item.url} {...item} />
          })}
        </div>
      </div>
  );
};

export default AlbumList;