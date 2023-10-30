import React from 'react';
import './ProgressBar.css'

const ProgressBar = ({value}) => {
  console.log(value)

  return (
      <div className='progress-bar' role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={{'--value': Math.floor(value)}}></div>
  );
};

export default ProgressBar;