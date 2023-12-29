import React from 'react';
import {useNavigate} from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate()


  return (
      <div className="flex row row_sb">
        <div className=""></div>
        <div className="col-1@xs col-2-5@m"><button onClick={() => navigate(-1)} className="col-1@xs btn mt-2 "><i className='fa fa-arrow-left'></i>Вернуться</button></div>
        <div className=""></div>
      </div>
  );
};

export default GoBack;