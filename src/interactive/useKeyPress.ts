import { useEffect } from 'react';

import { FunctionsObject } from '../utils';

export default (
  targetKey?: string,
  onPressUp?: () => void,
  functions?: FunctionsObject
): void => {
  useEffect(() => {
    const handleUp = ({ key }: KeyboardEvent): void => {
      if (targetKey !== undefined && onPressUp !== undefined) {
        if (key === targetKey) {
          onPressUp();
        }
      }

      if (functions !== undefined) {
        switch (key) {
          case 'ArrowRight':
            functions['ArrowRight']();
            break;
          case 'ArrowLeft':
            functions['ArrowLeft']();
            break;
          case 'A':
          case 'a':
            functions.a();
            break;
          case 'B':
          case 'b':
            functions.b();
            break;
          case 'C':
          case 'c':
            functions.c();
            break;
          case 'D':
          case 'd':
            functions.d();
            break;
          case 'E':
          case 'e':
            functions.e();
            break;
          case '1':
            functions['1']();
            break;
          case '2':
            functions['2']();
            break;
          case '3':
            functions['3']();
            break;
          case '4':
            functions['4']();
            break;
          case '5':
            functions['5']();
            break;
          case ' ':
            functions[' ']();
            break;
          default:
            return;
        }
      }
    };

    window.addEventListener('keyup', handleUp);

    return (): void => {
      window.removeEventListener('keyup', handleUp);
    };
  });
};
