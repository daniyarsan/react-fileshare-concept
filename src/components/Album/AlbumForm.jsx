import React, {useEffect, useRef} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {array, object, string} from "yup";
import SelectField from "../UI/SelectField/SelectField.jsx";
import {_ImageRow} from "./_ImageRow.jsx";

function AlbumForm({album, submitHandler, showCurrentImagesBlock = false}) {

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


  return (
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
              <Form className="flex pdd-md-wrapper">
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

                  { oldFiles && showCurrentImagesBlock(oldFiles) }

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
                  <button type='submit' className={`col-1@xs btn mt-2 ${(isValid && dirty) ? 'active' : ''}`}>Сохранить</button>
                </div>
              </Form>
          )
        }}
      </Formik>

  )
}

export default AlbumForm
