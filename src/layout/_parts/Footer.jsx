import React, {useEffect} from 'react'
import store from "../../store/store.js";

function Footer() {

  return (
      <div className="footer">
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>
            <div>
              <div className="row row_center">
                <div className="bold small mr-1">Telegram</div>
                <a href="" target="_blank">
                  <i className="small link text-orange fa-solid fa-clone"></i>
                </a>
              </div>

              <div className="row row_center">
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Footer
