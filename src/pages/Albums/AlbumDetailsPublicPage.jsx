import React from 'react'
import {useParams} from "react-router-dom";
import AlbumPublic from "../../components/Album/AlbumPublic/AlbumPublic.jsx";

function AlbumDetailsPublicPage() {
  const {url} = useParams()
  const {password} = useParams()


  return <AlbumPublic {...{url, password}} />
}

export default AlbumDetailsPublicPage
