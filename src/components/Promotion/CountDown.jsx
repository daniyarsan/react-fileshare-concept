import React, {useEffect, useState} from 'react';
import {secondsToDays, secondsToHours, secondsToMinutes, secondsToSeconds} from "../../service/TimeConverter.js";

const CountDown = ({seconds}) => {

  const [countdownSeconds, setCountdownSeconds] = useState(seconds)
  const [minutes, setMinutes] = useState()
  const [hours, setHours] = useState()
  const [days, setDays] = useState()
  const [sec, setSec] = useState()

  useEffect(() => {
    const interval = setInterval(() => {

      setCountdownSeconds(countdownSeconds - 1);

      setMinutes(secondsToMinutes(countdownSeconds))
      setHours(secondsToHours(countdownSeconds))
      setDays(secondsToDays(countdownSeconds))
      setSec(secondsToSeconds(countdownSeconds))

    }, 1000);

    return () => clearInterval(interval);
  }, [countdownSeconds]);


  const Divider = () => {
    return <div className="ml-1 mr-1" style={{height: '100%', paddingTop: '5px'}}>:</div>
  }

  return sec && (
      <div className="timer row center">
        <div className="row row_center">
          <div>
            <h1>{days}</h1>
            <p className="bolder small text-dark">дн</p>
          </div>
          <Divider/>
          <div>
            <h1 className="thin">{hours}</h1>
            <p className="small text-dark light">час</p>
          </div>
          <Divider/>
          <div>
            <h1 className="thin">{minutes}</h1>
            <p className="small text-dark light">мин</p>
          </div>
          <Divider/>
          <div>
            <h1 className="thin">{sec}</h1>
            <p className="small text-dark light">сек</p>
          </div>
        </div>
      </div>

  )


};

export default CountDown;