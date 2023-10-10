import React, {useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {array, object, string} from "yup";
import SelectField from "../UI/SelectField/SelectField.jsx";
import {_ImageRow} from "./_ImageRow.jsx";
import {createAlbum, createAlbumPublic} from "../../api/manager.js";
import {toast} from "react-toastify";
import AlbumSuccess from "./AlbumSuccess.jsx";
import {useSelector} from "react-redux";
import PeriodSelectField from "../UI/PeriodSelectField/PeriodSelectField.jsx";
import {AUTH_TOKEN, BASE_API_URL, REFRESH} from "../../api/const.js";
import axios from "axios";

function AlbumForm({album, setLoading}) {
  
  const [albumUploadResult, setAlbumUploadResult] = useState()
  const {isAuth, userData} = useSelector(state => state.user)

  // console.log(userData)

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

  const submitHandler = (data, formikHelpers) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    data.files.forEach(item => {
      formData.append('files', item.image)
    })

    const createAlbumFunc = isAuth ? createAlbum : createAlbumPublic

    createAlbumFunc(formData).then(({status, data}) => {
      setLoading(false)
      if (status >= 400 && status <= 499) {
        if (data?.code == 12) {
          toast.error('На бесплатном тарифе доступна загрузка до 2 фотографий за раз', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        }
      } else {
        setAlbumUploadResult(data)
        toast.success('Альбом успешно создан', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
      }

    }).catch((data) => {
      console.log(data)
      setLoading(false)
    })
  }


  return  (
      albumUploadResult ? <AlbumSuccess {...albumUploadResult} /> :

      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={submitHandler}>
        {({errors, isValid, setFieldValue, values, dirty}) => {
          const fileRef = useRef()
          const {oldFiles} = values

          useEffect(() => {
            album?.album && setFieldValue('name', album?.album.name)
            album?.album && setFieldValue('description', album?.description)
            album?.album && setFieldValue('period', album?.album.shelf_time)
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
                        <p>Укажите заголовок, добавьте описание и <span className="bold text-dark">прикрепите файлы</span> для создания альбома. Для создания записки
                          достаточно только описания.</p>
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
                      <div className="limit mt-1 relative">
                        <Field component={PeriodSelectField} name="period" placeholder='Срок хранения' limitDays={userData.tariff?.shelf_time ? userData.tariff.shelf_time / 24 : 30 }/>
                        <ErrorMessage className="text-danger" name="period" component="small"/>
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
                      При загрузке удаляются все метаданные изображений и генерируются случайные названия. Доступные форматы изображений .jpg .png. Количество загруженных
                      файлов в альбом ограничены активным тарифом.
                    </p>


                    <FieldArray name='files'>
                      {(fieldArrayProps) => {
                        const {push, form} = fieldArrayProps;
                        const {values} = form;
                        const {files} = values;

                        return (
                            <>
                              <div className="cards mt-2">
                                {files.map((file, index) => (<_ImageRow key={index} index={index} {...fieldArrayProps} file={file}/>))}
                              </div>

                              <div className="row row_end mt-2">
                                <button type='button'
                                        className='col-1@xs btn outline'
                                        onClick={() => {
                                          fileRef.current.click()
                                        }}>
                                  <i className='fa fa-cloud-upload'></i>
                                  Загрузить фото
                                </button>

                                <input ref={fileRef} type="file" hidden multiple='multiple' onChange={(event) => {
                                  const currentTargetFiles = event.currentTarget.files
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
                </div>
                <div className="flex row row_sb">
                  <div className=""></div>
                  <div className="col-1@xs col-2-5@m">
                    <button type='submit' className={`col-1@xs btn mt-2 ${(isValid && dirty) ? 'active' : ''}`}>Получить ссылку</button>
                  </div>
                  <div className=""></div>
                </div>
              </Form>
          )
        }}
      </Formik>
  )
}

export default AlbumForm
