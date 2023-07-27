import React, {useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from "formik";
import {Preloader} from "../../components/Preloader/index.js";
import {array, object, string} from "yup";
import {formatBytes, formatTime} from "../../service/helper.js";
import {createAlbum} from "../../api/manager.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function CreateAlbumPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isSecured, setIsSecured] = useState(true)

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
    })),
  })

  const onSubmit = (data, formikHelpers) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('period', data.period);
    formData.append('description', data.description);
    formData.append('secured', data.secured);
    data.files.forEach(item => {
      formData.append('files', item.image)
    })

    createAlbum(formData).then(resp => {
      setLoading(false)
      toast.success('Альбом успешно создан', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      })
      navigate('/albums')
    })

    // formikHelpers.resetForm()
  }

  const PreviewImage = ({file}) => {
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

  const ImageBlock = ({index, setFieldValue, remove, values}) => {
    const fileRef = useRef()
    const [file, setFile] = useState(null)

    return (
        <div key={index} className="mt-2">
          <div className="card-wrapper">
            <div className="row row_sb">
              <p className="bold text-dark">{index >= 0 && `${index + 1}.`} {file?.name}</p>
              <div className="text-grey link" onClick={() => remove(index)}>Удалить</div>
            </div>
            <p className="small">{file?.size && formatBytes(file.size)} {file?.lastModified && formatTime(file?.lastModified)}</p>

            <hr/>

            <div className="flex row-1@xs">
              <div className="img-wrapper mt-1 col-4-12@m">
                {/* If file is uploaded - initiate preview */}
                {values.files[index].image && <PreviewImage file={values.files[index].image}/>}
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
              <div className="mt-1 col-8-12@m">
                <Field as='textarea' name={`files[${index}].description`} type="text" placeholder="Описание к файлу…"/>
              </div>
            </div>
          </div>
          <hr className="mt-2"/>
        </div>
    )
  }

  /* FORM OBSERVER TO UPDATE STATE DATA */
  const FormObserver = () => {
    const {values} = useFormikContext();

    useEffect(() => {
      const {secured} = values
      setIsSecured(secured)
    }, [values]);

    return null;
  };

  /* RENDER WHOLE PAGE */
  return (
      <>
        {loading && <Preloader/>}

        <section className="canvas create-albom">
          <div className="container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
              {({errors, isValid, setFieldValue, values, handleSubmit, touched, dirty}) => (
                  <Form className="flex pdd-md-wrapper">
                    <FormObserver/>
                    <div className="col-1@sx col-2-5@m pdd-md-hor mt-3">
                      <div className="row row_center">
                        <div className="toggleDefault">
                          <Field id="switch" type="checkbox" name="secured"/>
                          <label htmlFor='switch'></label>
                        </div>

                        <div className="link small text-grey"> выбрать видимость альбома</div>
                      </div>

                      <div className="row row_sb">
                        <h1 className="bolder">Создание {isSecured ? 'приватного' : 'публичного'} альбома <span className="cleo text-orange ml-1 link"><i
                            className="fa-solid fa-circle-question"></i></span></h1>
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
                          <Field className="col-1@xs" as="select" name="period">
                            <option value="">Выберите период</option>
                            <option value="1">1 день</option>
                            <option value="3">3 дня</option>
                            <option value="7">7 дней</option>
                            <option value="14">14 дней</option>
                            <option value="30">30 дней</option>
                            <option value="90">90 дней</option>
                          </Field>
                          <ErrorMessage className="text-danger" name="period" component="small"/>
                        </div>

                        <div className="mt-1">
                          <Field as='textarea' name="description" type="text" placeholder="Описание к альбому…"/>
                        </div>

                      </div>
                    </div>

                    <div className="col-1@sx col-3-5@m pdd-md-hor set-height mt-3">
                      <h1 className="bolder">Вложенные в альбом файлы</h1>

                      <p className="mt-1">Вы можете отправить каждый загруженный файл отдельно, не предоставляя доступ ко всему альбому. После создания перейдите в раздел мои
                        альбомы,
                        выберите необходимый файл и поделитесь им. (только для зарегистрированных пользователей)</p>

                      {/* Complex dynamic field set to add more photos */}

                      <FieldArray name='files'>
                        {(fieldArrayProps) => {
                          const {push, form} = fieldArrayProps;
                          const {values} = form;
                          const {files} = values;

                          return (
                              <div className="cards">
                                {files.map((f, index) => (<ImageBlock key={index} index={index} {...fieldArrayProps} setFieldValue={setFieldValue} values={values}/>))}
                                <div className="row row_end mt-2">

                                  {/* Add new image item */}
                                  <div className="btn ml-2 active" onClick={() => push({
                                    description: '',
                                    image: null
                                  })}>Добавить
                                  </div>
                                </div>
                              </div>
                          )
                        }}
                      </FieldArray>
                    </div>

                    <button type='submit' className={`col-1@xs btn mt-2 ${(isValid && dirty) ? 'active' : ''}`}>Создать</button>
                  </Form>
              )}
            </Formik>

          </div>
        </section>
      </>
  )
}

export default CreateAlbumPage
