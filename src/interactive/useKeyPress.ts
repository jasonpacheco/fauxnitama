import { useEffect } from 'react';

export default (targetKey: string, onPressUp: () => void): void => {
  useEffect(() => {
    const handleUp = ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        onPressUp();
      }
    };

    window.addEventListener('keyup', handleUp);

    return (): void => {
      window.removeEventListener('keyup', handleUp);
    };
  });
};
