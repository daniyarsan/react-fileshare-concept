import React, {useContext, useEffect, useState} from 'react';
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {ALBUMS_LIST} from "../../../api/const.js";
import AlbumListItem from "./AlbumListItem.jsx";


const AlbumList = () => {
  const {requester} = useContext(RequestContext);
  const [albumsList, setAlbumsList] = useState()

  useEffect(() => {
    requester.post(`${ALBUMS_LIST}`).then(({data}) => {
      setAlbumsList(data?.albums)
      // setLoading(false)
    })
  }, [])


  return (
      <section className="canvas albums">
        <div className="container">
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
      </section>
  );
};

export default AlbumList;