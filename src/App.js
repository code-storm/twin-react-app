import { useState } from 'react';

export default function () {
  const [durationDD, setDurationDD] = useState([
    { value: 300, display: '5mins' },
    { value: 600, display: '10mins' },
    { value: 900, display: '15mins' },
  ]);

  const [currentDuration, setCurrentDuration] = useState(300);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const selectHandler = (ev) => {
    console.log(ev.target, ev.target.value);
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
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  const onChangeTo = (type, e) => {
    if (type == 'from') {
      setFrom(e.target.value);
    } else {
      setTo(e.target.value);
    }
  };

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
      <button type="button" onClick={onMakeCall}>
        {'Call ' + to}
      </button>
    </div>
  );
}
