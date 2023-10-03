import React, {useEffect, useState} from 'react'
import AlbumDetails from "../../components/Album/AlbumDetails.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteAlbum, getAlbumDetails, getFullImage} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {toast} from "react-toastify";
import AlbumDetailsLoading from "../../components/Album/AlbumDetailsLoading.jsx";
import DeleteDialog from "../../components/UI/DeleteDialog.jsx";

function AlbumDetailsPage() {
  const {url} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [albumDetails, setAlbumDetails] = useState()

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
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
    deleteAlbum(url).then((resp) => {
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
   return await getFullImage(index, url)
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
            <div className="breadcrumb row mt-3">
              <Link to="/albums">Мои альбомы | </Link>
              <Link to='#'>{albumDetails?.album?.name}</Link>
            </div>

            <div className="row row_end row_sb mt-2">
              <Link to={`/album/edit/${url}`} className="bold sm"><i></i>Редактировать альбом</Link>
            </div>

            <AlbumDetails {...{albumDetails, url, setLoading, handleRemoveAlbum, fullImageOpenHandler}} />

            <div className="row row_start mt-2">
              <DeleteDialog title='Вы уверены' text='Что хотите удалить альбом?' handleDelete={() => {
                handleRemoveAlbum(url)
              }}>
                <div className="btn danger">Удалить альбом</div>
              </DeleteDialog>
            </div>
          </div>
        </section>
      </>)
}

export default AlbumDetailsPage
