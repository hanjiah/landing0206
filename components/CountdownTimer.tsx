
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              clearInterval(timer);
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 text-center">
      <div className="bg-gray-800 text-white p-3 rounded-lg min-w-[60px]">
        <span className="text-2xl font-bold block">{format(timeLeft.hours)}</span>
        <span className="text-[10px] uppercase">Hours</span>
      </div>
      <span className="text-gray-800 text-2xl font-bold self-center">:</span>
      <div className="bg-gray-800 text-white p-3 rounded-lg min-w-[60px]">
        <span className="text-2xl font-bold block">{format(timeLeft.minutes)}</span>
        <span className="text-[10px] uppercase">Mins</span>
      </div>
      <span className="text-gray-800 text-2xl font-bold self-center">:</span>
      <div className="bg-gray-800 text-white p-3 rounded-lg min-w-[60px]">
        <span className="text-2xl font-bold block">{format(timeLeft.seconds)}</span>
        <span className="text-[10px] uppercase">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
