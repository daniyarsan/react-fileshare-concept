import React, {useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from "formik";
import {Preloader} from "../Preloader/index.js";
import {array, object, string} from "yup";
import {formatBytes, formatTime} from "../../service/helper.js";
import {createAlbum, getAlbumDetails, updateAlbum} from "../../api/manager.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import SelectField from "../SelectField/SelectField.jsx";

function AlbumForm({url}) {
  const isAddMode = !url;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [album, setAlbum] = useState()
  const [removedImages, setRemovedImages] = useState([])

  const initialValues = {
    name: '',
    description: '',
    period: '',
    files: [],
  }

  const validation = object({
    period: string().required('Обязательное поле'),
    files: array().of(object().shape({
      image: string().required('Images should be added'),
    }))
  })

  /* Actions */

  /* Fetch Album details for Edit */
  useEffect(() => {
    if (!isAddMode) {
      setLoading(true)
      getAlbumDetails(url).then(resp => {
        setLoading(false)
        setAlbum(resp?.data)
      }).catch(err => {
        setLoading(false)
      })
    }
  }, []);

  /* Form Submit */
  const onSubmit = (data, formikHelpers) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    data.files.forEach(item => {
      formData.append('files', item.image)
    })


    if (isAddMode) {
      createAlbum(formData).then(resp => {
        setLoading(false)
        toast.success('Альбом успешно создан', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
        navigate('/albums')
      }).catch(({response}) => {
        setLoading(false)
        if (response.data?.code == 12) {
          toast.error('Лимит загрузки файлов превышен', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        }
      })
    } else {
      formData.append('removedImages', removedImages);
      updateAlbum(formData).then(resp => {
        setLoading(false)
        toast.success('Альбом успешно создан', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
        navigate('/albums')
      })
    }

    formikHelpers.resetForm()
  }



  const ImageBlock = ({file, index, remove, setFieldValue}) => {
    const [preview, setPreview] = useState()

    const render = new FileReader()
    render.readAsDataURL(file.image)
    render.onload = () => {
      setPreview(render.result)
    }

    return (
        <div className="flex image-card-wrapper">

          <div className='preview img-cover col-3-12@xs'>
            <img className="" src={preview} alt="preview"/>
          </div>

          <div className="col-7-12@xs img-meta">
            <p className="small">{file.image?.lastModified && formatTime(file.image?.lastModified)} | {file.image?.name} </p>
          </div>

          <div className="col-2-12@xs img-action text-danger" onClick={() => remove(index)}>Удалить</div>
        </div>
    )
  }

  /* RENDER WHOLE PAGE */
  /* FORM OBSERVER TO UPDATE STATE DATA */
  const FormObserver = () => {
    // const {values} = useFormikContext();
    // useEffect(() => {
    //   const {secured} = values
    //   setIsSecured(secured)
    // }, [values]);
    return null;
  };

  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas create-albom">
          <div className="container">
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
              {({errors, isValid, setFieldValue, values, dirty}) => {
                const fileRef = useRef()

                useEffect(() => {
                  album?.album && setFieldValue('name', album?.album.name)
                  album?.album && setFieldValue('description', album?.description)
                  album?.album && setFieldValue('period', album?.album.shelf_time)
                  // album?.album && setFieldValue('oldFiles', album?.images.map(item => ({image: item})))

                }, [album])


                return (
                    <Form className="flex pdd-md-wrapper">
                      <FormObserver/>
                      <div className="col-1@sx col-2-5@m pdd-md-hor mt-3">
                        <div className="link">Выбрать видимость альбома</div>

                        <div className="row row_sb">
                          <h1 className="bolder">Создание альбома</h1>
                        </div>

                        <div className="mt-1">
                          <div className="row">
                            <div className='icon-block'><i className="fa-solid fa-pen-line"></i></div>
                            <p>Придумайте название, добавьте описание и/или <span className="bold text-dark">прикрепите файлы</span> для создания альбома.</p>
                          </div>
                          <div className="row mt-1">
                            <div className='icon-block'><i className="fa-solid fa-lock-hashtag"></i></div>
                            <p>При необходимости <span className="bold text-dark">добавьте описание и пароль</span> к каждому файлу, установите срок жизни ссылки.</p>
                          </div>
                          <div className="row mt-1">
                            <div className='icon-block'><i className="fa-solid fa-link"></i></div>
                            <p><span className="bold text-dark">Делитесь ссылкой</span> для просмотра или скачивания архива.</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="title">
                            <Field className='col-1@xs' type="text" name="name" placeholder="Заголовок"/>
                            <ErrorMessage className="text-danger" name="name" component="small"/>
                          </div>
                          <div className="limit mt-1 relative">
                            <Field component={SelectField} name="period" placeholder='Выберите период' options={[
                              {value: 1, label: '1 день'},
                              {value: 3, label: '3 дня'},
                              {value: 7, label: '7 дней'},
                              {value: 14, label: '14 дней'},
                              {value: 30, label: '30 дней'},
                              {value: 90, label: '90 дней'},
                            ]}/>

                            <ErrorMessage className="text-danger" name="period" component="small"/>
                          </div>
                          <div className="mt-1">
                            <Field as='textarea' name="description" type="text" placeholder="Описание к альбому…"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-1@sx col-3-5@m pdd-md-hor set-height mt-3">
                        {/* Complex dynamic field set to add more photos */}
                        {/*{!isAddMode && <OldImagesBlock {...values}/>}*/}

                        <h1 className="bolder">Вложенные в альбом файлы</h1>
                        <p className="mt-1">
                          Вы можете отправить каждый загруженный файл отдельно, не предоставляя доступ ко всему альбому. После создания перейдите в раздел мои
                          альбомы, выберите необходимый файл и поделитесь им. (только для зарегистрированных пользователей)
                        </p>


                        <FieldArray name='files'>
                          {(fieldArrayProps) => {
                            const {push, form} = fieldArrayProps;
                            const {values} = form;
                            const {files} = values;

                            return (
                                <>
                                  <div className="cards mt-2">
                                    {files.map((file, index) => (<ImageBlock key={index} index={index} {...fieldArrayProps} setFieldValue={setFieldValue} file={file} />))}
                                  </div>

                                  <div className="row row_end mt-2">
                                    <button type='button'
                                            className='col-1@xs btn active'
                                            onClick={() => {
                                              fileRef.current.click()
                                            }}>Загрузить фото
                                    </button>

                                    <input ref={fileRef} type="file" hidden multiple='multiple' onChange={(event) => {
                                      const currentTargetFiles = event.currentTarget.files
                                      // setFieldValue('files', Object.values(currentTargetFiles).map(value => value))
                                      Object.values(currentTargetFiles).map(currentTargetFile => {
                                        push({image: currentTargetFile})
                                      })

                                    }}/>
                                  </div>
                                </>
                            )
                          }}
                        </FieldArray>

                      </div>

                      <div className="col-1@xs pdd-md-hor">
                        <button type='submit' className={`col-1@xs btn mt-2 ${(isValid && dirty) ? 'active' : ''}`}>{isAddMode ? 'Создать' : 'Обновить'}</button>
                      </div>
                    </Form>
                )
              }}
            </Formik>
          </div>
        </section>
      </>
  )
}

export default AlbumForm





// const OldImagePreview = ({image}) => {
//   const imageId = image.data.slice(40, 60);
//   let isRemoved = removedImages.includes(imageId)
//
//   return (
//       <div className="image-card-wrapper col-2-12@m">
//         <div className={`card img-cover ${isRemoved && 'disabled'}`}>
//           <img className="" src={`data:image/jpeg;base64,${image?.data}`} alt="preview"/>
//         </div>
//
//         <div className="text-grey link" onClick={() => {
//           if (!isRemoved) {
//             setRemovedImages([...removedImages, imageId])
//           } else {
//             setRemovedImages(removedImages.filter(item => {
//               return item != imageId
//             }))
//           }
//         }}> {isRemoved ? 'Удалено' : 'Удалить'}
//         </div>
//       </div>
//   )
// }
// const OldImagesBlock = ({oldFiles}) => {
//   return (
//       <>
//         <h1 className="bolder">Файлы в альбоме</h1>
//         <p className="mt-1">Здесь вы видите файлы которые уже загружены в ваш альбом</p>
//         <div className="flex cards">
//           {oldFiles && oldFiles.map((file, index) => {
//             return <OldImagePreview key={index} index={index} {...file} />
//           })}
//         </div>
//         <hr/>
//       </>
//   )
// }