import React, {useEffect, useState} from 'react'
import AlbumForm from "../../components/Album/AlbumForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumDetails, updateAlbum} from "../../api/manager.js";
import {toast} from "react-toastify";
import {Preloader} from "../../components/UI/Preloader/index.js";

function AlbumEditPage() {
  const {url} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState()
  const [removedImages, setRemovedImages] = useState([])

  useEffect(() => {
    getAlbumDetails(url).then(resp => {
      setLoading(false)
      setAlbum(resp?.data)
    }).catch(err => {
      setLoading(false)
    })
  }, [])
  
  const showCurrentImagesBlock = (files) => {

    const _OldImageBlock = ({index, image}) => {
      let isRemoved = removedImages.includes(index)

      return (
          <div className='flex image-card-wrapper'>
            <div className={`preview img-cover col-6-12@xs ${isRemoved && 'disabled'}`}>
              <img className="" src={`data:image/jpeg;base64,${image?.data}`} alt="preview"/>
            </div>

            <div className="col-6-12@xs img-action text-danger link" onClick={() => {
              if (!isRemoved) {
                setRemovedImages([...removedImages, index])
              } else {
                setRemovedImages(removedImages.filter(item => {
                  return item != index
                }))
              }
            }}> {isRemoved ? 'Удалено' : 'Удалить'}
            </div>
          </div>
      )
    }


    return (
        <>
          <h1 className="bolder">Файлы в альбоме</h1>
          <p className="mt-1">Здесь вы видите файлы которые уже загружены в ваш альбом</p>

          { files.map(({image}, index) => {
            return <_OldImageBlock key={index} index={index} image={image} />
          })}
          <hr/>
        </>
    )
  }


  const submitHandler = (data, formikHelpers) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    data.files.forEach(item => {
      formData.append('files', item.image)
    })

    formData.append('files_to_delete', removedImages);

    !formData.has('files_to_delete') && formData.append('files_to_delete', [])
    formData.append('url', url);

    updateAlbum(formData).then(resp => {
      setLoading(false)
      toast.success('Альбом успешно обновлен', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })

      navigate('/albums')

    }).catch(({response}) => {

      toast.error(response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      setLoading(false)
    })
  }


  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas create-albom">
          <div className="container">
            <AlbumForm album={album} submitHandler={submitHandler} showCurrentImagesBlock={showCurrentImagesBlock} />
          </div>
        </section>
      </>
  )
}

export default AlbumEditPage
