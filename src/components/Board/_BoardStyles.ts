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
  highlighted: boolean | undefined;
}>`
  margin: 0;
  padding: 0;
  border: 1px solid #000;

  &:hover {
    ${({ highlighted }): string =>
      highlighted ? 'background-color: blue' : ''};
    cursor: pointer;
  }
  ${({ hasBackground }): string =>
    hasBackground
      ? hasBackground === 'red'
        ? `background: url(${RedTempleArch})`
        : `background: url(${BlueTempleArch})`
      : ''};
`;
