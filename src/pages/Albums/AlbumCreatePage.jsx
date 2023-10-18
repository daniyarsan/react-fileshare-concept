import React, {useContext, useEffect, useState} from 'react'
import AlbumCreate from "../../components/Album/AlbumCreate/AlbumCreate.jsx";
import store from "../../store/store.js";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import AlbumSuccess from "../../components/Album/AlbumCreate/AlbumSuccess.jsx";
import AlbumSuccessPublic from "../../components/Album/AlbumCreate/AlbumSuccessPublic.jsx";
import {useLocation, useParams} from "react-router-dom";

function AlbumCreatePage() {
  const { currentUser } = useContext(AuthContext);
  const [createdAlbum, setCreatedAlbum] = useState()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.fresh == true) {
      setCreatedAlbum(null)
    }
  }, [location.state])


  if (createdAlbum) {
    return currentUser.isAuthorized ? <AlbumSuccess createdAlbum={createdAlbum} setCreatedAlbum={setCreatedAlbum} /> : <AlbumSuccessPublic createdAlbum={createdAlbum} setCreatedAlbum={setCreatedAlbum} />
  }

  return <AlbumCreate setCreatedAlbum={setCreatedAlbum}  />
}

export default AlbumCreatePage
