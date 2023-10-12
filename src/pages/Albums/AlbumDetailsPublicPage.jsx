import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails/AlbumDetails.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteAlbum, deleteAlbumPublic, getAlbumDetailsPublic, getFullImage, getFullImagePublic} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {toast} from "react-toastify";
import AlbumDetailsLoading from "../../components/Album/AlbumDetails/AlbumDetailsLoading.jsx";

function AlbumDetailsPublicPage() {
  const {url} = useParams()
  const {password} = useParams()
  const navigate = useNavigate()
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()

  useEffect(() => {
    getAlbumDetailsPublic(url, password).then(resp => {
      setAlbumDetails(resp?.data)
      setLoading(false)
      setInitialLoading(false)
    }).catch(err => {
      toast.error('Альбом не найден', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

      navigate('/albums')
    })
  }, [])

  const handleRemoveAlbum = (url) => {
    setLoading(true)
    deleteAlbumPublic(url, password).then((resp) => {
      toast.success('Альбом удален', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      navigate('/albums')
    }).catch(err => {
      setLoading(false)
      // console.log(err)
    })
  }

  const fullImageOpenHandler = async (index) => {
    return await getFullImagePublic(url,password, index)
  }

  if (initialLoading) {
    return <>
      <Preloader/>
      <AlbumDetailsLoading/>
    </>
  }

  return (
      <>
        {loading && <Preloader/>}
        <section className='canvas'>
          <div className="container">
            <AlbumDetails {...{albumDetails, url, setLoading, handleRemoveAlbum, fullImageOpenHandler}} />
          </div>
        </section>
      </>)
}

export default AlbumDetailsPublicPage
