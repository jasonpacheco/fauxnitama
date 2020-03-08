import { useEffect, useState } from 'react';

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

  const fmtTime = (value: string, time: 's' | 'm' | 'h'): string => {
    const unit =
      (time === 's' && 'second') ||
      (time === 'm' && 'minute') ||
      (time === 'h' && 'hour');
    const suffix = value === '1' ? '' : 's';
    return `${value === '1' ? 'one' : value} ${unit}${suffix}`;
  };

  const formattedTime = (currentTime: number, alt = false): string => {
    if (currentTime < 0) {
      return 'Error: Time cannot be negative?';
    }

    const seconds = `${currentTime % 60}`;
    const minutes = `${Math.floor(currentTime / 60) % 60}`;
    const hours = `${Math.floor(currentTime / 3600)}`;

    if (alt) {
      if (hours === '0' && minutes === '0') {
        return fmtTime(seconds, 's');
      } else if (hours === '0' && seconds === '0') {
        return fmtTime(minutes, 'm');
      } else if (minutes === '0' && seconds === '0') {
        return fmtTime(hours, 'h');
      } else if (hours === '0') {
        return `${fmtTime(minutes, 'm')} and ${fmtTime(seconds, 's')}`;
      } else if (minutes === '0') {
        return `${fmtTime(hours, 'h')} and ${fmtTime(seconds, 's')}`;
      } else if (seconds === '0') {
        return `${fmtTime(hours, 'h')} and ${fmtTime(minutes, 'm')}`;
      } else {
        return `${fmtTime(hours, 'h')}, ${fmtTime(minutes, 'm')}, and ${fmtTime(
          seconds,
          's'
        )}`;
      }
    }

    return hours === '0'
      ? `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
      : `${hours.padStart(2, '0')}:${minutes.padStart(
          2,
          '0'
        )}:${seconds.padStart(2, '0')}`;
  };

  return {
    elapsedTime,
    resetTimer: (): void => handleResetTimer(),
    startTimer: (): void => setIsTicking(true),
    stopTimer: (): void => setIsTicking(false),
    formattedTime,
  };
};
