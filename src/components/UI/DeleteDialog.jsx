import React from 'react'
import {confirmAlert} from "react-confirm-alert";


export const DeleteDialog = ({children, title, text, handleDelete}) => {

  const onDeleteClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <dialog>
              <h2>{title}</h2>
              <p>{title}</p>
              <button onClick={onClose} aria-label="close" className="x">❌</button>

              <div className="row row_sb row-1-2@m">
                <button onClick={onClose} className='btn default m-2'>Нет</button>
                <button className='btn danger m-2'
                        onClick={() => {
                          handleDelete()
                          onClose()}}> Да!
                </button>
              </div>
            </dialog>
        )
      }
    })
  }

  return (
      <div onClick={onDeleteClick}>{children}</div>
  )
}

export default DeleteDialog
