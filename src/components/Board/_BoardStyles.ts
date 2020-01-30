import styled from 'styled-components';
import BlueTempleArch from '../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../assets/_red/temple_arch.svg';
import { BOARD_GAME } from '../../utils';
const { COLS } = BOARD_GAME;

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

export const Box = styled.div<{
  hasBackground: string | boolean;
  selectedCell: 'Blue' | 'Red' | boolean | null | undefined;
  validCellHighlight: boolean;
}>`
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  background-color: ${({ validCellHighlight }): string =>
    validCellHighlight ? '#fff9c4' : '#fff'};
  ${({ selectedCell }): string =>
    selectedCell
      ? selectedCell === 'Blue'
        ? 'background-color: #03a9f4'
        : 'background-color: #ff5252'
      : ''};
  &:hover {
    cursor: pointer;
  }
  ${({ hasBackground }): string =>
    hasBackground
      ? hasBackground === 'red'
        ? `background-image: url(${RedTempleArch})`
        : `background-image: url(${BlueTempleArch})`
      : ''};
`;
