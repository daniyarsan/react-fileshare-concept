import React from 'react'
import classes from './modal.module.scss'

function Modal({children, closeEvent}) {
  return (
      <div className={classes['modal']}>
        <div className={classes['modal-content']}>
          <span className={classes['close']} onClick={closeEvent}>&times;</span>
          {children}
        </div>
      </div>
  )
}

export default Modal

