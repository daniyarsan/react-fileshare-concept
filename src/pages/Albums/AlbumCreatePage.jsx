import React, {useState} from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {createAlbum} from "../../api/manager.js";
import {toast} from "react-toastify";
import {Preloader} from "../../components/UI/Preloader/index.js";
import AlbumSuccess from "../../components/Album/AlbumSuccess.jsx";

function AlbumCreatePage() {

  const [loading, setLoading] = useState(false)
  const [albumUploadResult, setAlbumUploadResult] = useState()

  const submitHandler = (data, formikHelpers) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    data.files.forEach(item => {
      formData.append('files', item.image)
    })

    createAlbum(formData).then(({data}) => {
      setLoading(false)
      setAlbumUploadResult(data)
      toast.success('Альбом успешно создан', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

    }).catch(({response}) => {
      setLoading(false)
      if (response.data?.code == 12) {
        toast.error('Лимит загрузки файлов превышен', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
      }
    })
  }


  return (
      <>
        {loading && <Preloader/>}
        <section className="canvas create-albom">
          <div className="container">
            {albumUploadResult ? <AlbumSuccess {...albumUploadResult} /> : (<AlbumForm submitHandler={submitHandler} />)}
          </div>
        </section>
      </>
  )
}

export default AlbumCreatePage
