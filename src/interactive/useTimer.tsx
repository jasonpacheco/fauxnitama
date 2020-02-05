import { useState, useEffect } from 'react';

interface Timer {
  elapsedTime: number;
  resetTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  formattedTime: (currentTime: number, alt?: boolean) => string;
}
/**
 * useTimer hook provides:
 * @elapsedTime a number for elapsed time in seconds
 * @resetTimer callback to reset time to 0
 * @startTimer callback to start time
 * @stopTimer callback to stop time
 * @formattedTime function that accepts a numeric time in seconds and returns a formatted value in format 'hh:mm:ss'
 */
export default (): Timer => {
  const [isTicking, setIsTicking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timeInterval: number;
    if (isTicking) {
      timeInterval = setInterval(
        () => setElapsedTime(prevElapsedTime => prevElapsedTime + 1),
        1000
      );
    }
    return (): void => clearInterval(timeInterval);
  }, [isTicking]);

  const handleResetTimer = (): void => {
    setIsTicking(false);
    setElapsedTime(0);
  };

  const formattedTime = (currentTime: number, alt = false): string => {
    if (currentTime < 0) {
      return 'Error: Time cannot be negative?';
    }

    const seconds = `${currentTime % 60}`.padStart(2, '0');
    const minutes = `${Math.floor(currentTime / 60) % 60}`.padStart(2, '0');
    const hours = `${Math.floor(currentTime / 3600)}`.padStart(2, '0');

    if (alt) {
      const secSuffix = seconds === '01' ? '' : 's';
      const minSuffix = minutes === '01' ? '' : 's';
      const hrSuffix = hours === '01' ? '' : 's';
      const fmtSec = `${seconds === '01' ? 'one' : seconds} second${secSuffix}`;
      const fmtMin = `${minutes === '01' ? 'one' : minutes} minute${minSuffix}`;
      const fmtHr = `${hours === '01' ? 'one' : hours} hour${hrSuffix}`;

      if (hours === '00' && minutes === '00') {
        return fmtSec;
      } else if (hours === '00' && seconds === '00') {
        return fmtMin;
      } else if (minutes === '00' && seconds === '00') {
        return fmtHr;
      } else if (hours === '00') {
        return `${fmtMin} and ${fmtSec}`;
      } else if (minutes === '00') {
        return `${fmtHr} and ${fmtSec}`;
      } else if (seconds === '00') {
        return `${fmtHr} and ${fmtMin}`;
      } else {
        return `${fmtHr}, ${fmtMin}, and ${fmtSec}`;
      }
    }

    return hours === '00'
      ? `${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;
  };

  return {
    elapsedTime,
    resetTimer: (): void => handleResetTimer(),
    startTimer: (): void => setIsTicking(true),
    stopTimer: (): void => setIsTicking(false),
    formattedTime,
  };
};
