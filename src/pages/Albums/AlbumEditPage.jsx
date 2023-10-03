import React, {useEffect, useState} from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {useParams} from "react-router-dom";
import {getAlbumDetails} from "../../api/manager.js";
import {Preloader} from "../../components/UI/Preloader/index.js";
import AlbumEditForm from "../../components/Album/AlbumEditForm.jsx";

function AlbumEditPage() {
  const {url} = useParams()
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState()

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setLoading(false)
      setAlbum(resp?.data)
    }).catch(err => {
      setLoading(false)
    })
  }, [])


  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas create-albom">
          <div className="container">
            <AlbumEditForm album={album} setLoading={setLoading}/>
          </div>
        </section>
      </>
  )
}

export default AlbumEditPage
