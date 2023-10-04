import React, {useEffect, useState} from 'react';
import {secondsToDays, secondsToHours, secondsToMinutes} from "../../service/TimeConverter.js";

const CountDown = ({seconds}) => {
  const [minutes, setMinutes] = useState()
  const [hours, setHours] = useState()
  const [days, setDays] = useState()

  useEffect(() => {
    setMinutes(secondsToMinutes(seconds))
    setHours(secondsToHours(seconds))
    setDays(secondsToDays(seconds))
  }, []);

  return (
      <div className="timer row center">
        <div className="row row_center">
          <div className="">
            <h1>{days}</h1>
            <p className="bolder small text-dark">дн</p>
          </div>
          <div className="ml-1">
            <h1 className="thin">: {hours} :</h1>
            <p className="small text-dark light">час</p>
          </div>
          <div className="ml-1">
            <h1 className="thin">{minutes}</h1>
            <p className="small text-dark light">мин</p>
          </div>
        </div>
      </div>
  );
};

export default CountDown;