'use client';

import { useState, useEffect } from 'react';

const Clock = () => {
  const getTimeString = () =>
    new Date().toLocaleTimeString('ko-KR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
};

export default Clock;
