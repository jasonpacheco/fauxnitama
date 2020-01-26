import styled from 'styled-components';
import { BOARD_GAME } from '../../utils';
const { COLS } = BOARD_GAME;

export const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 30rem;
`;

export const Grid = styled.div`
  border: 1px solid #000;
  display: grid;
  height: 30rem;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${COLS}, 6rem);
`;
