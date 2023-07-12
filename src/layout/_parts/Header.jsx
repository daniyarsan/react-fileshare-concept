import React from 'react'

function Header() {
  return (
      <div className="nav">
        <div className="container">
          <div className="row row_center row_sb h100">
            <div className="logo upp hide-sm">
              <span className="bolder">Soft</span><span className="light">Dropbox</span>
            </div>
            <div className="menu row row_center">
              <a href="">
                <span className="hide-sm ml-2">Главная</span>
                <span className="hide-m"><i className="fa-solid fa-house"></i></span>
              </a>
              <a href="">
                <span className="hide-sm ml-2">Тарифы</span>
                <span className="hide-m"><i className="fa-solid fa-crown"></i></span>
              </a>
              <a href="">
                <div className="addFile">
                  <div className="button">
                    <i className="fa-solid fa-plus fa-xl"></i>
                  </div>
                </div>
              </a>
              <a href="">
                <span className="hide-sm ml-2">Мои альбомы</span>
                <span className="hide-m"><i className="fa-solid fa-book-open"></i></span>
              </a>
              <div className="row">
                <a href="">
                  <span className="hide-sm ml-2">Nick</span>
                  <span className="hide-m"><i className="fa-solid fa-person"></i></span>
                </a>
                <a className="ml-1 grey hide-sm" href="">(выход)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header
