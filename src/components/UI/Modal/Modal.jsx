import React from 'react'
import classes from './modal.module.scss'

function Modal({children, closeEvent}) {
  return (
      <div className={classes['modal']} onClick={closeEvent}>
        <div className={classes['modal-content']} onClick={e => e.stopPropagation()}>
          <span className={classes['close']} onClick={closeEvent}>&times;</span>
          {children}
        </div>
      </div>
  )
}

export default Modal

