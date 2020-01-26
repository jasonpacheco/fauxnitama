import styled from 'styled-components';
import BlueTempleArch from '../../assets/blue_temple_arch.svg';
import RedTempleArch from '../../assets/red_temple_arch.svg';
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

export const Box = styled.div<{ hasBackground: string | boolean }>`
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  &:hover {
    cursor: pointer;
  }
  ${({ hasBackground }): string =>
    hasBackground
      ? hasBackground === 'red'
        ? `background: url(${RedTempleArch})`
        : `background: url(${BlueTempleArch})`
      : ''};
`;
