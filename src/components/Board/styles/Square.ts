import styled from 'styled-components/macro';
import BlueTempleArch from '../../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../../assets/_red/temple_arch.svg';

interface SquareWrapperStyleProps {
  hasTempleBackground: string | boolean;
  highlightClickedPiece: boolean;
  highlightValidSquare: boolean;
  isActive: boolean;
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

  ${({ hasTempleBackground }): string =>
    hasTempleBackground
      ? hasTempleBackground === 'Red'
        ? `background-image: url(${RedTempleArch})`
        : `background-image: url(${BlueTempleArch})`
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
