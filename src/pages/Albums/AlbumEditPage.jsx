import React from 'react'
import {useParams} from "react-router-dom";
import AlbumEdit from "../../components/Album/AlbumEdit/AlbumEdit.jsx";

function AlbumEditPage() {
  const {url} = useParams()


  return (
      <section className="canvas create-albom">
        <div className="container">
          <AlbumEdit url={url} />
        </div>
      </section>
  )
}

export default AlbumEditPage
