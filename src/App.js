import { useState } from 'react';
import Timer from './Timer';

export default function () {
  const [durationDD, setDurationDD] = useState([
    { value: 300, display: '5mins' },
    { value: 600, display: '10mins' },
    { value: 900, display: '15mins' },
  ]);

  const [currentDuration, setCurrentDuration] = useState(300);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showTimer, setShowTimer] = useState(false);

  const selectHandler = (ev) => {
    setCurrentDuration(ev.target.value);
  };

  const onMakeCall = (e) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('to', to);
    urlencoded.append('durationInSec', currentDuration);
    urlencoded.append('from', from);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('https://twin-node-server.herokuapp.com/connect', requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result); setShowTimer(true);})
      .catch((error) => console.log('error', error));
  };

  const onChangeTo = (type, e) => {
    if (type == 'from') {
      setFrom(e.target.value);
    } else {
      setTo(e.target.value);
    }
  };

  function hideTimer() {
    setShowTimer(false);
  }

  const renderDurationOptions = () => {
    return (
      <select placeholder="Select Duration" onChange={selectHandler}>
        {durationDD.map((each, i) => {
          return (
            <option key={i} defaultValue={currentDuration == each.value} value={each.value}>
              {each.display}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div>
      <h1>Hello World</h1>
      <div style={{padding: "10px;"}}>
        {showTimer && <h3><Timer duration={currentDuration} hideTimer={hideTimer}/></h3>}
      </div>
      {renderDurationOptions()}
      <input
        type="text"
        onChange={onChangeTo.bind(this, 'from')}
        placeholder="Calling from: "
      />
      <input
        type="text"
        onChange={onChangeTo.bind(this, 'to')}
        placeholder="Calling to: "
      />
      <button type="button" disabled={showTimer} onClick={onMakeCall}>
        {'Call ' + to}
      </button>
    </div>
  );
}
