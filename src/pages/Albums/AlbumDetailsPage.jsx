import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumDetails, getFullImage} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

function AlbumDetailsPage() {
  const {url} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()
  const {isAuth} = useSelector(state => state.user)

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    }).catch(err => {
      toast.error('Альбом не найден', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

      navigate('/albums')
    })
  }, [])



  return (
      <>
        {loading && <Preloader/>}
        <AlbumDetails {...{albumDetails, url, isAuth, setLoading}} />
      </>)
}

export default AlbumDetailsPage
