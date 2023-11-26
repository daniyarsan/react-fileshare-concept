import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import AlbumPresentation from "../../components/Album/AlbumPublic/AlbumPresentation.jsx";
import store from "../../store/store.js";


function AlbumPresentationPage() {
  const navigate = useNavigate()
  const {url} = useParams()
  const {password} = useParams()
  const [keysChain, setKeysChain] = store.useState("keysChainStorage")


  useEffect(() => {
    if (password) {
      setKeysChain([...keysChain, {url: url,  password: password}])
      navigate(`/show/${url}`)
    }
  }, [])


  const key = keysChain.find((key) =>  key.url === url)

  return key && (<AlbumPresentation {...{url: url, password: key.password}} />)
}

export default AlbumPresentationPage
