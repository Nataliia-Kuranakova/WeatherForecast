import { useState, useEffect } from 'react';

const CountdownTimer = ({ startTripData }) => {

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countdownDate = new Date(startTripData).getTime();

  useEffect(() => {
    if (!countdownDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  if (!countdownDate) return <div>No data</div>;

  const { days, hours, minutes, seconds } = time;

  return (
    <>
      <div className="current-weather-counter">
        <div className="current-weather-counter-count">
          <div>{days}</div>
          <p>days</p>
        </div>
        <div className=" current-weather-counter-count">
          <div>{hours}</div>
          <p>hours</p>
        </div>
        <div className="current-weather-counter-count">
          <div>{minutes}</div>
          <p>minutes</p>
        </div>
        <div className="current-weather-counter-count">
          <div>{seconds}</div>
          <p>seconds</p>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
