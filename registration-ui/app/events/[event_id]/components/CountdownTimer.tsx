import React, { useState, useEffect } from 'react';

type Props = {
  start_time: string;
};

const CountdownTimer = ({ start_time }: Props) => {
  const eventDate = new Date(start_time).getTime();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculateTimeRemaining() {
      const now = new Date().getTime();
      const timeDiff = eventDate - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      } else {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    }

    const initialTimeRemaining = calculateTimeRemaining();
    setTimeRemaining(initialTimeRemaining);

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeRemaining.days > 0 || timeRemaining.hours > 0 || timeRemaining.minutes > 0 || timeRemaining.seconds > 0) {
    return (
      <div className="mx-auto flex flex-row space-x-8 font-bold text-slate-700">
        <h3>Registration starts in:</h3>
        {timeRemaining.days > 0 && <p>{timeRemaining.days} days</p>}
        <p>{timeRemaining.hours} hours</p>
        <p>{timeRemaining.minutes} minutes</p>
        <p>{timeRemaining.seconds} seconds</p>
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex flex-row space-x-8 font-bold text-slate-700">
        <h3>Registration has started</h3>
      </div>
    );
  }
};

export default CountdownTimer;
