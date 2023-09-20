import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumDetails, getFullImage} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {useSelector} from "react-redux";

function AlbumDetailsPage() {
  const {url} = useParams()
  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()
  const {isAuth} = useSelector(state => state.user)

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)

      // navigate('/albums')
    })
  }, [])


  const input = {albumDetails, url, isAuth, setLoading}

  return (
      <>
        {loading && <Preloader/>}
        <AlbumDetails {...{input}} />
      </>)
}

export default AlbumDetailsPage
