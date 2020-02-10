import styled from 'styled-components/macro';
import BlueTempleArch from '../../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../../assets/_red/temple_arch.svg';
import { CellWrapperStyleProps } from '../../../interfaces/styles.interface';

export const CellWrapper = styled.div<CellWrapperStyleProps>`
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  ${({ highlightSelectedPiece }): string =>
    highlightSelectedPiece ? 'background-color: #fff9c4' : ''};

  ${({ highlightValidCell }): string =>
    highlightValidCell
      ? highlightValidCell === 'Blue'
        ? 'background-color: #b3e5fc'
        : 'background-color: #ffcdd2'
      : ''};

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
