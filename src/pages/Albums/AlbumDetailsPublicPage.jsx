import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumDetailsPublic} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";

function AlbumDetailsPublicPage() {
  const {url} = useParams()
  const {password} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()

  useEffect(() => {
    getAlbumDetailsPublic(url, password).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    }).catch(err => {
      navigate('/albums')
    })
  }, [])

  const data = {
    albumDetails, url
  }

  return (
      <>
        {loading && <Preloader/>}

        <AlbumDetails {...data} />
      </>)
}

export default AlbumDetailsPublicPage
