import { useEffect, useState } from 'react';

export default function (props) {
  const [seconds, setSeconds] = useState(props.duration);
  let timeLeftVar = secondsToTime(seconds);
  const [time, setTime] = useState(timeLeftVar);

let timer;
  useEffect(() => {
      if (seconds == 0) {clearInterval(timer);props.hideTimer();}
      else timer = setInterval(countDown, 1000)
      return () => {
        clearInterval(timer);
      }
  },[seconds]);
  
  function secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }


  function countDown() {
    // Remove one second, set state so a re-render happens.
    let secs = seconds - 1;
    setSeconds(secs);
    setTime(secondsToTime(secs));
  }

  return (
    <div>
      Timer: m: {time.m} s: {time.s}
    </div>
  );
}
