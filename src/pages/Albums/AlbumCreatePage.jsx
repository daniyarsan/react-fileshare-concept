import React, {useState} from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {Preloader} from "../../components/UI/Preloader/index.js";

function AlbumCreatePage() {
  const [loading, setLoading] = useState(false)

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
