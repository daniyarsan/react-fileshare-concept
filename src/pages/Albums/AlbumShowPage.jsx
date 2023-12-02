import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import AlbumShow from "../../components/Album/AlbumShow/AlbumShow.jsx";
import store from "../../store/store.js";


function AlbumShowPage() {
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

  return key && (<AlbumShow {...{url: url, password: key.password}} />)
}

export default AlbumShowPage
