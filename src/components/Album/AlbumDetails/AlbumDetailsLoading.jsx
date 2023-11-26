import React from 'react'
import {Link} from "react-router-dom";


function AlbumDetailsLoading() {

  return (
      <>
        <div className="breadcrumb row mt-3">
          <Link to="/albums" style={{width: '150px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></Link>
          <Link to='#' style={{width: '150px', height: '20px', margin: '5px 0px 5px 5px', background: '#dcdcdc', borderRadius: '20px'}}></Link>
        </div>

        <div className="row row_center row_sb mt-2">
          <h1 className="bolder m-2" style={{width: '250px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></h1>
        </div>

        <div className="date" style={{width: '200px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></div>
        <div className="storagePeriod">
          <span className="bold" style={{display: "inline-block", width: '250px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></span>
        </div>
        <div className="password mt-05">
          <span className="bold" style={{display: "inline-block", width: '250px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></span>
        </div>

        <div className="row mt-05">
          <span className="mr-1" style={{display: "inline-block", width: '300px', height: '20px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></span>
        </div>
        <div className="description mt-1">
          <span className="bold"></span>
          <div style={{width: '550px', height: '120px', margin: '5px 0px 5px 0px', background: '#dcdcdc', borderRadius: '20px'}}></div>
        </div>

        <div className="cards flex row-1-2@xs row-1-4@s row-1-6@m mt-2 pdd-sm-wrapper">
          <div className="card-wrapper pdd-sm galleryItem" style={{width: '150px', height: '150px', margin: '10px', background: '#dcdcdc', borderRadius: '20px'}}>
            <div className="card square ">
              <div><i className="icon-close text-white fa-solid fa-xmark fa-xl"></i></div>
              <div className="img-cover">
              </div>
            </div>
          </div>

          <div className="card-wrapper pdd-sm galleryItem" style={{width: '150px', height: '150px', margin: '10px', background: '#dcdcdc', borderRadius: '20px'}}>
            <div className="card square ">
              <div><i className="icon-close text-white fa-solid fa-xmark fa-xl"></i></div>
              <div className="img-cover">
              </div>
            </div>
          </div>

          <div className="card-wrapper pdd-sm galleryItem" style={{width: '150px', height: '150px', margin: '10px', background: '#dcdcdc', borderRadius: '20px'}}>
            <div className="card square ">
              <div><i className="icon-close text-white fa-solid fa-xmark fa-xl"></i></div>
              <div className="img-cover">
              </div>
            </div>
          </div>

        </div>
      </>
  )
}

export default AlbumDetailsLoading
