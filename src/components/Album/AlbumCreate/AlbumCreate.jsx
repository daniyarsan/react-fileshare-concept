import React, {useContext, useEffect, useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {object, string, array} from "yup";
import {_ImageRow} from "../_ImageRow.jsx";
import {toast} from "react-toastify";
import PeriodSelectField from "../../UI/PeriodSelectField/PeriodSelectField.jsx";
import {AuthContext} from "../../../contexts/AuthProvider.jsx";
import {RequestContext} from "../../../contexts/RequestProvider.jsx";
import {
  ALBUM_CREATE,
  ALBUM_CREATE_ANON,
  ALBUM_FORM_NAME_LIMIT,
  ALBUM_FORM_TEXTAREA_LIMIT,
  DEFAULT_SHELF_DAYS_LIMIT,
  VALIDATION_DEFAULT_FILES_UPLOAD_LIMIT
} from "../../../api/const.js";
import {Album} from "../../../models/Album.js";
import DropZone from "../../UI/DropZone/DropZone.jsx";
import AlbumSuccess from "./AlbumSuccess.jsx";
import {useLocation} from "react-router-dom";
import AlbumSuccessPublic from "./AlbumSuccessPublic.jsx";

function AlbumCreate() {

  const [createdAlbum, setCreatedAlbum] = useState()
  const location = useLocation()
  const {requester} = useContext(RequestContext);
  const {currentUser} = useContext(AuthContext);
  const {setLoader} = useContext(AuthContext);

  const filesLimit = currentUser?.tariff?.files || VALIDATION_DEFAULT_FILES_UPLOAD_LIMIT


  useEffect(() => {
    if (location.state?.fresh == true) {
      setCreatedAlbum(null)
    }
  }, [location.state])

  useEffect(() => {
    setLoader(false)

  }, []);
  const initialValues = {
    name: '',
    description: '',
    period: '',
    files: [],
  }

  const validation = object({
    name: string().max(ALBUM_FORM_NAME_LIMIT, `Вы привысили лимит ${ALBUM_FORM_NAME_LIMIT} символов`),
    period: string().required('Обязательное поле'),
    description: string().max(ALBUM_FORM_TEXTAREA_LIMIT, `Вы привысили лимит ${ALBUM_FORM_TEXTAREA_LIMIT} символов`),
    files: array().max(filesLimit,`Вы можете загрузить не более ${filesLimit} файлов`)
  })
  const submitHandler = (data, formikHelpers) => {
    setLoader(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    data.files.forEach(file => {
      formData.append('files', file)
    })

    requester.postMultipart(`${currentUser ? ALBUM_CREATE : ALBUM_CREATE_ANON}`, formData).then(({data}) => {
      setCreatedAlbum(new Album(data))
      toast.success('Альбом успешно создан', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
    }).finally(() => {
      setLoader(false)
    })
  }

  if (createdAlbum) {
    return  currentUser
        ?
        <AlbumSuccess createdAlbum={createdAlbum} setCreatedAlbum={setCreatedAlbum} />
        :
        <AlbumSuccessPublic createdAlbum={createdAlbum} setCreatedAlbum={setCreatedAlbum} />
  }

  return (
      <div className="create-albom">
        {!currentUser && (<p className="small bold text-grey">Для обеспечения максимальной  безопастности хранимых и  пересылаемых данных, мы просим предварительно зарегистрировать аккаунт, чтобы не потерять доступ до фотографий загруженных без создания  учетной записи</p>)}
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={submitHandler}>
          {({errors, isValid, setFieldValue, values, dirty}) => {

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
                          <Field component={PeriodSelectField} name="period" placeholder='Срок хранения' limitDays={currentUser?.getTariffShelfDays() || DEFAULT_SHELF_DAYS_LIMIT}/>
                          <ErrorMessage className="text-danger" name="period" component="small"/>
                        </div>
                        <div className="mt-1">
                          <Field as='textarea' name="description" type="text" placeholder="Описание к альбому (не обязательно)"/>
                          <ErrorMessage className="text-danger" name="description" component="small"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-1@sx col-3-5@m pdd-md-hor set-height mt-3">

                      <h1 className="bolder">Добавить изображение</h1>
                      <p className="mt-1">
                        При загрузке удаляются все метаданные изображений и генерируются случайные названия. Доступные форматы изображений .jpg .png. Количество загруженных
                        файлов в альбом ограничены активным тарифом.
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

                                <ErrorMessage className="text-danger" name="files" component="div"/>
                                <DropZone onDrop={acceptedFiles => {
                                  setFieldValue("files", [...files, ...acceptedFiles]);
                                }}/>
                              </>
                          )}}
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
      </div>
  )
}

export default AlbumCreate
