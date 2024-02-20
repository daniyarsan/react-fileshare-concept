import React from 'react'
import Reset from "../../components/Auth/Reset/Reset.jsx";


function ResetPage(props) {

  return (
      <div className="flex row-1@xs row-1-3@m">
        <div></div>
        <div>
          <div className="row row_sb row_center">
            <h1 className="bolder">Личные данные</h1>
          </div>

          <Reset/>
        </div>
        <div></div>
      </div>
  )
}

export default ResetPage
