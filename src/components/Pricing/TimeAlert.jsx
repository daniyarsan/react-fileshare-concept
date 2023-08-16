import React from "react";

export const TimerAlert = () => {
  return (
      <div className="custom-alert timer">
        <div className="row row_end">
          <div className="icon-close">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="body row">
          <div className="row row_center" style={{lineHeight: '24px'}}>
            <div className="">
              <h1>74</h1>
              <p className="bolder">дн</p>
            </div>
            <div className="ml-1">
              <h1 className="thin">05</h1>
              <p>мин</p>
            </div>
            <div className="ml-1">
              <h1 className="thin">12</h1>
              <p>сек</p>
            </div>
          </div>
          <div className="img-contain ml-2" style={{width: '40px'}}>
            <img src="/static/img/emoji/icon_001.svg" alt=""/>
          </div>
        </div>
      </div>
  )
}