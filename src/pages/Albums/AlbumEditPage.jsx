import React from 'react'
import {useParams} from "react-router-dom";
import AlbumEdit from "../../components/Album/AlbumEdit/AlbumEdit.jsx";

function AlbumEditPage() {
  const {url} = useParams()


  return <AlbumEdit url={url} />
}

export default AlbumEditPage
