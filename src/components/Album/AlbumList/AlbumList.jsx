import React, {useContext, useEffect, useState} from 'react';
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {ALBUMS_LIST} from "../../../api/const.js";
import AlbumListItem from "./AlbumListItem.jsx";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import {Album} from "../../../models/Album.js";


const AlbumList = () => {
  const {requester} = useContext(RequestContext);
  const { setLoader } = useContext(AuthContext);
  const [albumsList, setAlbumsList] = useState()

  useEffect(() => {
    setLoader(true)
    requester.post(`${ALBUMS_LIST}`).then(({data}) => {
      const albumsList = data?.albums.map(item => {
        return new Album(item)
      })

      setAlbumsList(albumsList)
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
          {albumsList && albumsList.map(album => {
            return <AlbumListItem key={album.url} album={album} />
          })}
        </div>
      </div>
  );
};

export default AlbumList;