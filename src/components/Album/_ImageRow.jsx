import React, {useState} from 'react'
import {formatTime} from "../../service/TimeConverter.js";

export const _ImageRow = ({file, index, remove}) => {
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
        <div className="col-2-12@xs img-action text-danger link" onClick={() => remove(index)}>Удалить</div>
      </div>
  )
}

