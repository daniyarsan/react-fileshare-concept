import React from 'react'
import Generate from "../../components/Auth/Generate/Generate.jsx";

function GeneratePage(props) {

  return (
      <section className='canvas'>
        <div className="container">
          <div className="flex row-1@xs row-1-3@m">
            <div></div>
            <Generate />
          </div>
        </div>
      </section>
  )
}

export default GeneratePage
