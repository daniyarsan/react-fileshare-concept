import React from 'react'
import {useNavigate, useParams} from "react-router-dom";
import AlbumDetails from "../../components/Album/AlbumDetails/AlbumDetails.jsx";

function AlbumDetailsPage() {
  const {url} = useParams()

  return <AlbumDetails {...{url}} />

}

export default AlbumDetailsPage
