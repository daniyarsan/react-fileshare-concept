import React, {useEffect, useState} from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {Preloader} from "../../components/UI/Preloader/index.js";
import {useDispatch, useSelector} from "react-redux";
import {update} from "../../store/slices/userSlice.js";

function AlbumCreatePage() {
  const [loading, setLoading] = useState(false)
  const {isAuth, userData} = useSelector(state => state.user)


  console.log(userData)


  return (
      <>
        {loading && <Preloader />}

        <section className="canvas create-albom">
          <div className="container">
            <AlbumForm setLoading={setLoading} />
          </div>
        </section>
      </>
  )
}

export default AlbumCreatePage
