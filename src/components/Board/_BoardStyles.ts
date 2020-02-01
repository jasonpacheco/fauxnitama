import styled from 'styled-components';
import BlueTempleArch from '../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../assets/_red/temple_arch.svg';
import { CellWrapperStyleProps } from '../../interfaces/styles.interface';
import { BOARD_COLS as COLS } from '../../utils/constants';

export const GridWrapper = styled.div`
  margin: 0 auto;
  width: 30rem;
`;

export const Grid = styled.div`
  border: 1px solid #000;
  display: grid;
  height: 30rem;
  grid-template-columns: repeat(${COLS}, 6rem);
  grid-template-rows: repeat(${COLS}, 6rem);
`;

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
  &:hover {
    cursor: pointer;
  }
  ${({ hasTempleBackground }): string =>
    hasTempleBackground
      ? hasTempleBackground === 'Red'
        ? `background-image: url(${RedTempleArch})`
        : `background-image: url(${BlueTempleArch})`
      : ''};
`;
