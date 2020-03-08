import styled from 'styled-components/macro';

import BlueTempleArch from '../../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../../assets/_red/temple_arch.svg';
import { BLUE, Colors, RED } from '../../../store/engine/types/gameTypes';

interface SquareWrapperStyleProps {
  hasTempleBackground: typeof BLUE | typeof RED | boolean;
  highlightClickedPiece: boolean;
  highlightValidSquare: boolean;
  isActive: boolean;
  colors: Colors[];
}

export const SquareWrapper = styled.div<SquareWrapperStyleProps>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 6rem;
  width: 6rem;
  border: 1px solid #000;

  ${({ highlightClickedPiece }): string =>
    highlightClickedPiece ? 'background-color: #fff9c4' : ''};

  ${({ highlightValidSquare }): string =>
    highlightValidSquare ? 'background-color: palegreen' : ''};

  ${({ isActive }): string =>
    isActive
      ? `&:hover {
    cursor: pointer;
  }`
      : ''};

  ${({ hasTempleBackground, colors }): string =>
    hasTempleBackground
      ? hasTempleBackground === colors[0]
        ? `background-image: url(${
            colors[0] === BLUE ? BlueTempleArch : RedTempleArch
          }); transform: rotate(180deg);`
        : `background-image: url(${
            colors[1] === RED ? RedTempleArch : BlueTempleArch
          })`
      : ''};
`;

interface OverlayProps {
  color: string;
}

export const Overlay = styled.div<OverlayProps>`
  box-sizing: border-box;
  ${({ color }): string => (color !== '' ? `background-color: ${color}` : '')};
  height: 94px;
  width: 94px;
`;
