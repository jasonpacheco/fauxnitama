import styled from 'styled-components/macro';
import BlueTempleArch from '../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../assets/_red/temple_arch.svg';
import { CellWrapperStyleProps } from '../../interfaces/styles.interface';
import { BOARD_COLS as COLS } from '../../utils/constants';

export const GridWrapper = styled.div`
  margin: 0 auto;
  width: 34rem;
`;

export const Grid = styled.div`
  border: 1px solid #000;
  display: grid;
  margin: 0 auto;
  height: 30rem;
  width: 30rem;
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

export const GridLegend = styled.div<{ invert?: boolean }>`
  display: grid;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  & > span {
    text-align: center;
    margin: auto;
  }
  ${({ invert }): string => (invert ? `transform: rotate(180deg)` : '')};
`;

export const NumberRow = styled(GridLegend)`
  grid-template-columns: repeat(${COLS}, 6rem);
  height: 2rem;
  width: 30rem;
  margin: 0 auto;
`;

export const LetterColumn = styled(GridLegend)`
  grid-template-rows: repeat(${COLS}, 6rem);
  width: 2rem;
`;
