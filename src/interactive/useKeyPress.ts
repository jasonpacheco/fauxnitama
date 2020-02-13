import { useEffect, useState } from 'react';

export default (
  targetKey: string,
  onPressDown = (): void => {
    return;
  },
  onPressUp = (): void => {
    return;
  }
): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleDown = ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        setKeyPressed(true);
        onPressDown();
      }
    };

    const handleUp = ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        setKeyPressed(false);
        onPressUp();
      }
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    return (): void => {
      window.addEventListener('keydown', handleDown);
      window.addEventListener('keyup', handleUp);
    };
  });

  return keyPressed;
};
