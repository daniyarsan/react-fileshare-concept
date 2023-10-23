import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import AlbumPublic from "../../components/Album/AlbumPublic/AlbumPublic.jsx";
import store from "../../store/store.js";


function AlbumDetailsPublicPage() {
  const navigate = useNavigate()
  const {url} = useParams()
  const {password} = useParams()
  const [urlParam, setUrlParam] = store.useState("urlParam")
  const [passwordParam, setPasswordParam] = store.useState("passwordParam")

  useEffect(() => {
    if (url) {
      setUrlParam(url)
    }
    if (password) {
      setPasswordParam(password)
    }
    if (url && password) {
      navigate('/album')
    }
  }, []);


  console.log(urlParam)
  console.log(passwordParam)


  return <AlbumPublic {...{url: urlParam, password: passwordParam}} />
}

export default AlbumDetailsPublicPage
