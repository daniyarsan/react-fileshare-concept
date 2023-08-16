import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumDetails} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";

function AlbumDetailsPage() {
  const {url} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
    }).catch(err => {
      navigate('/albums')
    })
  }, [])


  return (
      <>
        {loading && <Preloader/>}
        <AlbumDetails {...{albumDetails, url, setLoading}} />
      </>)
}

export default AlbumDetailsPage
