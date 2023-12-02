import React from "react";

export const ImageCard = ({image, handleFullImageOpen}) => {

  return (
      <div className="square">
        <div className="img-cover">
          <img className="galleryImg pointer" onClick={handleFullImageOpen} src={`data:image/jpeg;base64,${image}`} />
        </div>
      </div>
  )
}