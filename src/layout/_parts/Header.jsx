import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthProvider.jsx";

function Header() {
  const { currentUser, logoutAction } = useContext(AuthContext);


  return (
      <div className="nav">
        <div className="container">
          <div className="row row_center row_sb h100">
            <div className="logo upp hide-sm">
              <Link to='/' state={{ fresh: true }}>
                <span className="bolder">Soft</span><span className="light">Dropbox</span>
              </Link>
            </div>
            <div className="menu row row_center">
              <Link to='/' state={{ fresh: true }}>
                <span className="hide-sm ml-2">Главная</span>
                <span className="hide-m"><i className="fa-solid fa-house"></i></span>
              </Link>

              <Link to='/plans'>
                <span className="hide-sm ml-2">Тарифы</span>
                <span className="hide-m"><i className="fa-solid fa-crown"></i></span>
              </Link>

              <div className="addFile">
                <Link to='/' state={{ fresh: true }}>
                  <div className="button">
                    <i className="fa-solid fa-plus faa-xl"></i>
                  </div>
                </Link>
              </div>

              <Link to={currentUser.isAuthorized ? '/albums' : '/login'}>
                <span className="hide-sm ml-2">Мои альбомы</span>
                <span className="hide-m"><i className="fa-solid fa-book-open"></i></span>
              </Link>

              {!currentUser.isAuthorized && (
                  <Link  to='/login'>
                    <span className="hide-m"><i className="fa-solid fa-person"></i></span>
                  </Link>
              )}

              {currentUser.isAuthorized && (
                  <Link  to='/profile'>
                    <span className="hide-sm ml-2"><i className="fa-solid fa-user"></i> {currentUser?.username}</span>
                    <span className="hide-m"><i className="fa-solid fa-person"></i></span>
                  </Link>
              )}

              {!currentUser.isAuthorized && (
                  <Link to='/login' className="hide-sm ml-2">Войти</Link>
              )}
              {currentUser.isAuthorized && (
                  <a className="ml-1 grey hide-sm" onClick={() => {
                    logoutAction()
                    // navigate('/')
                  }}>(выход)</a>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header
