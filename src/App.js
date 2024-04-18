import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timerID, setTimerID] = useState(null);

  const handleChange = (event) => {
    const selectedDate = new Date(event.target.value).getTime();
    const now = new Date().getTime();
    const maxDate = now + (100 * 24 * 60 * 60 * 1000); // 100 days in milliseconds
    if (selectedDate > maxDate) {
      alert('Please select a date within the next 100 days.');
      return;
    }
    setTargetDate(event.target.value);
  };

  const startCountdown = () => {
    if (timerID) return; // Don't start if already running
    const id = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance > 0) {
        const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);
        setDays(daysRemaining < 10 ? `0${daysRemaining}` : daysRemaining.toString());
        setHours(hoursRemaining < 10 ? `0${hoursRemaining}` : hoursRemaining.toString());
        setMinutes(minutesRemaining < 10 ? `0${minutesRemaining}` : minutesRemaining.toString());
        setSeconds(secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining.toString());
      } else {
        clearInterval(id);
      }
    }, 1000);
    setTimerID(id);
  };

  const stopCountdown = () => {
    clearInterval(timerID);
    setTimerID(null);
    setDays('00');
    setHours('00');
    setMinutes('00');
    setSeconds('00');
    setTargetDate('');
  };

  return (
    <div className="App">
      <h1>Countdown <span style={{ color: 'purple' }}>Timer</span></h1>

      <div>
        <input
          type="datetime-local"
          value={targetDate}
          onChange={handleChange}
        />
      </div>
      <div>
        {timerID ? (
          <button onClick={stopCountdown}>Cancel Timer</button>
        ) : (
          <button onClick={startCountdown}>Start Timer</button>
        )}
      </div>
      <div className="countdown-container">
        <div className="box">{days} <br /> days</div>
        <div className="box">{hours}<br /> hours</div>
        <div className="box">{minutes}<br /> minutes</div>
        <div className="box">{seconds}<br /> seconds</div>
      </div>

    </div>
  );
}

export default App;
