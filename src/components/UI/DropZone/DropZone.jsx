import React from 'react';
import {useDropzone} from "react-dropzone";
import './DropZone.css'

const DropZone = ({onDrop}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    },
    onDrop: onDrop
  })


  return (
      <div {...getRootProps()} className="row row_end mt-2">
        <button type='button' className='col-1@xs btn outline dropzone'>
          <i className='fa fa-cloud-upload'></i>
          <input {...getInputProps()} />
          {isDragActive ? 'Перетащите файлы в поле...' : ' Загрузить фото'}
        </button>
      </div>
  );
};
export default DropZone;