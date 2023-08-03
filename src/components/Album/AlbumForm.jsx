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
  const [isSecured, setIsSecured] = useState(true)
  const [album, setAlbum] = useState()
  const [removedImages, setRemovedImages] = useState([])

  const initialValues = {
    name: '',
    description: '',
    period: '',
    secured: false,
    files: [],
  }

  const validation = object({
    name: string().required('Обязательное поле'),
    period: string().required('Обязательное поле'),
    files: array().of(object().shape({
      image: string().required('Name is a required field.'),
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
        console.log(err)
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
    formData.append('public', !data.secured);
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

  const ImagePreview = ({file}) => {
    const [preview, setPreview] = useState()
    const render = new FileReader()
    render.readAsDataURL(file)
    render.onload = () => {
      setPreview(render.result)
    }
    return (
        <div className="card img-cover">
          <img className="" src={preview} alt="preview"/>
        </div>
    )
  }
  const ImageBlock = ({index, setFieldValue, remove, value}) => {
    const fileRef = useRef()
    const [file, setFile] = useState(null)

    return (
        <div key={index} className="mt-2">
          <div className="card-wrapper">
            <div className="row row_sb">
              <p className="bold text-dark">{file?.name}</p>
              <div className="text-grey link" onClick={() => remove(index)}>Удалить</div>
            </div>
            <p className="small">{file?.size && formatBytes(file.size)} {file?.lastModified && formatTime(file?.lastModified)}</p>

            <hr/>

            <div className="flex row-1@xs">
              <div className="img-wrapper mt-1 col-3-12@m">
                {/* If file is uploaded - initiate preview */}

                {value.image && <ImagePreview file={value.image}/>}

                <button type='button'
                        className='col-1@xs btn active'
                        onClick={() => {
                          fileRef.current.click()
                        }}>Загрузить
                </button>

                <input ref={fileRef} hidden type="file" onChange={(event) => {
                  const file = event.currentTarget.files[0]
                  setFile(file)
                  setFieldValue(`files[${index}].image`, file);
                }}/>
              </div>
              <div className="mt-1 col-9-12@m">
                <Field as='textarea' name={`files[${index}].description`} type="text" placeholder="Описание к файлу…"/>
              </div>
            </div>
          </div>
          <hr className="mt-2"/>
        </div>
    )
  }

  const OldImagePreview = ({image}) => {
    const imageId = image.data.slice(40, 60);
    let isRemoved = removedImages.includes(imageId)

    return (
        <div className="image-card-wrapper col-2-12@m">
          <div className={`card img-cover ${isRemoved && 'disabled'}`}>
            <img className="" src={`data:image/jpeg;base64,${image?.data}`} alt="preview"/>
          </div>

          <div className="text-grey link" onClick={() => {
            if (!isRemoved) {
              setRemovedImages([...removedImages, imageId])
            } else {
              setRemovedImages(removedImages.filter(item => {
                return item != imageId
              }))
            }
          }}> {isRemoved ? 'Удалено' : 'Удалить'}
          </div>
        </div>
    )
  }
  const OldImagesBlock = ({oldFiles}) => {
    return (
        <>
          <h1 className="bolder">Файлы в альбоме</h1>
          <p className="mt-1">Здесь вы видите файлы которые уже загружены в ваш альбом</p>
          <div className="flex cards">
            {oldFiles && oldFiles.map((file, index) => {
              return <OldImagePreview key={index} index={index} {...file} />
            })}
          </div>
          <hr/>
        </>
    )
  }


  /* RENDER WHOLE PAGE */
  /* FORM OBSERVER TO UPDATE STATE DATA */
  const FormObserver = () => {
    const {values} = useFormikContext();

    useEffect(() => {
      const {secured} = values
      setIsSecured(secured)
    }, [values]);

    return null;
  };

  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas create-albom">
          <div className="container">
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
              {({errors, isValid, setFieldValue, values, handleSubmit, touched, dirty}) => {

                useEffect(() => {
                  album?.album && setFieldValue('name', album?.album.name)
                  album?.album && setFieldValue('description', album?.description)
                  album?.album && setFieldValue('period', album?.album.shelf_time)
                  album?.album && setFieldValue('oldFiles', album?.images.map(item => ({image: item})))
                }, [album])

                return (
                    <Form className="flex pdd-md-wrapper">
                      <FormObserver/>
                      <div className="col-1@sx col-2-5@m pdd-md-hor mt-3">
                        <div className="link">Выбрать видимость альбома</div>

                        <div className="row row_center mt-1">
                          <div className="toggleDefault">
                            <Field id="switch" type="checkbox" name="secured"/>
                            <label htmlFor='switch'></label>
                          </div>
                        </div>

                        <div className="row row_sb">
                          <h1 className="bolder">Создание {isSecured ? 'приватного' : 'публичного'} альбома <span className="cleo text-orange ml-1 link"><i
                              className={`fa-solid ${isSecured ? 'fa-lock' : 'fa-lock-open'}`}></i></span></h1>
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
                        {!isAddMode && <OldImagesBlock {...values}/>}

                        <h1 className="bolder">Вложенные в альбом файлы</h1>
                        <p className="mt-1">Вы можете отправить каждый загруженный файл отдельно, не предоставляя доступ ко всему альбому. После создания перейдите в раздел мои
                          альбомы,
                          выберите необходимый файл и поделитесь им. (только для зарегистрированных пользователей)</p>

                        <FieldArray name='files'>
                          {(fieldArrayProps) => {
                            const {push, form} = fieldArrayProps;
                            const {values} = form;
                            const {files} = values;

                            return (
                                <div className="cards">
                                  {files.map((value, index) => (<ImageBlock key={index} index={index} {...fieldArrayProps} setFieldValue={setFieldValue} value={value}/>))}

                                  <div className="row row_end mt-2">
                                    {/* Add new image item */}
                                    <div className="btn ml-2 active" onClick={() => push({
                                      description: '',
                                      image: null
                                    })}><i className='fa fa-plus'></i>

                                    </div>
                                  </div>
                                </div>
                            )
                          }}
                        </FieldArray>
                      </div>

                      <div className="col-1@sx col-1@m pdd-md-hor">
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
