import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/slices/userSlice.js";
import {AUTH_TOKEN} from "../../api/const.js";

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isAuth} = useSelector(state => state.user)
  const isAuthorized = isAuth && localStorage.getItem(AUTH_TOKEN)
  const {userData} = useSelector(state => state.user)


  return (
      <div className="nav">
        <div className="container">
          <div className="row row_center row_sb h100">
            <div className="logo upp hide-sm">
              <a href='/'>
                <span className="bolder">Soft</span><span className="light">Dropbox</span>
              </a>
            </div>
            <div className="menu row row_center">
              <a href='/'>
                <span className="hide-sm ml-2">Главная</span>
                <span className="hide-m"><i className="fa-solid fa-house"></i></span>
              </a>
              <Link to='/plans'>
                <span className="hide-sm ml-2">Тарифы</span>
                <span className="hide-m"><i className="fa-solid fa-crown"></i></span>
              </Link>

              <div className="addFile">
                <Link to='/album/create'>
                  <div className="button">
                    <i className="fa-solid fa-plus faa-xl"></i>
                  </div>
                </Link>
              </div>

              <Link to={isAuthorized ? '/albums' : '/login'}>
                <span className="hide-sm ml-2">Мои альбомы</span>
                <span className="hide-m"><i className="fa-solid fa-book-open"></i></span>
              </Link>

              {!isAuthorized && (
                  <Link to='/login' className="hide-sm ml-2">Войти</Link>
              )}

              {isAuthorized && (
                  <>
                    <Link  to='/profile'>
                      <span className="hide-sm ml-2"><i className="fa-solid fa-user"></i> {userData?.username}</span>
                      <span className="hide-m"><i className="fa-solid fa-person"></i></span>
                    </Link>
                    <a className="ml-1 grey hide-sm" href="" onClick={() => {
                      dispatch(logout())
                      navigate('/')
                    }}>(выход)</a>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header
