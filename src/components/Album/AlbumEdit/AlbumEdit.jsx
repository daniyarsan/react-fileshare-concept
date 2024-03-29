import React, {useContext, useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {array, object, string} from "yup";
import {_ImageRow} from "../_ImageRow.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ALBUM_DETAILS, ALBUM_UPDATE_BY_ID} from "../../../api/const.js";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import DropZone from "../../UI/DropZone/DropZone.jsx";

function AlbumEdit({url}) {
  const {requester} = useContext(RequestContext)
  const navigate = useNavigate()
  const [removedImages, setRemovedImages] = useState([])
  const [album, setAlbum] = useState()
  const {setLoader} = useContext(AuthContext);

  useEffect(() => {
    setLoader(true)

    requester.post(`${ALBUM_DETAILS}`, {url}).then(resp => {
      setLoader(false)
      setAlbum(resp?.data)
    })
  }, [])


  const initialValues = {
    name: '',
    description: '',
    files: [],
  }

  const validation = object({
    files: array()
  })

  const submitHandler = (data, formikHelpers) => {
    setLoader(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description)
    formData.append('period', data.period)

    data.files.forEach(item => {
      formData.append('files', item)
    })

    formData.append('files_to_delete', removedImages);
    !formData.has('files_to_delete') && formData.append('files_to_delete', [])
    formData.append('url', album.album.url);

    requester.postMultipart(`${ALBUM_UPDATE_BY_ID}`, formData).then((resp) => {
      toast.success('Альбом успешно обновлен', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      navigate('/albums')
    }).finally(() => {
      setLoader(false)
    })
  }


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

          {files.map(({image}, index) => {
            return <_OldImageBlock key={index} index={index} image={image}/>
          })}
          <hr/>
        </>
    )
  }

  return (
      <div className="create-albom">

        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={submitHandler}>
          {({errors, isValid, setFieldValue, values, dirty}) => {
            const fileRef = useRef()
            const {oldFiles} = values

            useEffect(() => {

              album?.album && setFieldValue('name', album?.album.name)
              album?.album && setFieldValue('period', album?.album.shelf_time)
              album?.album && setFieldValue('description', album?.description)
              album?.album && setFieldValue('oldFiles', album?.images.map(item => ({image: item})))
            }, [album])

            return (
                <Form>
                  <div className="flex pdd-md-wrapper">
                    <div className="col-1@sx col-2-5@m pdd-md-hor mt-3">
                      <div className="row row_sb">
                        <h1 className="bolder">Создание альбома или записки</h1>
                      </div>

                      <div className="mt-1">
                        <div className="row">
                          <div className='icon-block'><i className="fa-solid fa-pen-line"></i></div>
                          <p>Укажите заголовок, добавьте описание и <span className="bold text-dark">прикрепите файлы</span> для создания альбома. Для создания записки достаточно
                            только описания.</p>
                        </div>
                        <div className="row mt-1">
                          <div className='icon-block'><i className="fa-solid fa-lock-hashtag"></i></div>
                          <p>Каждый альбом возможно скачать <span className="bold text-dark">архивом с паролем.</span> Пароль генерируется автоматически.</p>
                        </div>
                        <div className="row mt-1">
                          <div className='icon-block'><i className="fa-solid fa-link"></i></div>
                          <p><span className="bold text-dark">Делитесь ссылкой</span> для просмотра или скачивания архива в 1 клик.</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="title">
                          <Field className='col-1@xs' type="text" name="name" placeholder="Название (не обязательно)"/>
                          <ErrorMessage className="text-danger" name="name" component="small"/>
                        </div>

                        <div className="mt-1">
                          <Field as='textarea' name="description" type="text" placeholder="Описание к альбому"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-1@sx col-3-5@m pdd-md-hor set-height mt-3">

                      {oldFiles && showCurrentImagesBlock(oldFiles)}

                      <h1 className="bolder">Добавить изображение</h1>
                      <p className="mt-1">
                        При загрузке удаляются все метаданные изображений и генерируются случайные названия. Доступные форматы изображений .jpg .png. Количество загруженных файлов
                        в альбом ограничены активным тарифом.
                      </p>


                      <FieldArray name='files'>
                        {(fieldArrayProps) => {
                          const {form} = fieldArrayProps;
                          const {files} = form.values;

                          return (
                              <>
                                <div className="cards mt-2">
                                  {files.map((file, index) => {
                                    return <_ImageRow key={index} index={index} {...fieldArrayProps} file={file}/>
                                  })}
                                </div>
                                <DropZone onDrop={acceptedFiles => {
                                  setFieldValue("files", [...files, ...acceptedFiles]);
                                }}/>
                              </>
                          )
                        }}
                      </FieldArray>

                    </div>
                  </div>
                  <div className="flex row row_sb">
                    <div className=""></div>
                    <div className="col-1@xs col-2-5@m">
                      <button type='submit' className={`col-1@xs btn mt-2 ${(isValid && dirty) ? 'active' : ''}`}>Сохранить</button>
                    </div>
                    <div className=""></div>
                  </div>
                </Form>
            )
          }}
        </Formik>
      </div>
  )
}

export default AlbumEdit
