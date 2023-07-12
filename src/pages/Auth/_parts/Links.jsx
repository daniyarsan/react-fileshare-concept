import React from 'react'
import {Link} from "react-router-dom";

function Links({active}) {
  return (
      <div className="row center">
        <Link className={`mr-1 f-800 ${active == 'registration' ? 'text-dark' : 'text-grey'}`} to='/registration'>Регистрация</Link>
        <Link className={`ml-1 ${active == 'login' ? 'text-dark' : 'text-grey'}`} to='/login'>Вход</Link>
      </div>
  )
}

export default Links
