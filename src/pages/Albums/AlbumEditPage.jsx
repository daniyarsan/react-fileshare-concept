import React from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {useParams} from "react-router-dom";

function AlbumEditPage() {
  const {url} = useParams()

  return <AlbumForm url={url} />
}

export default AlbumEditPage
